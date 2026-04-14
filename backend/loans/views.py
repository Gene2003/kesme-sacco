"""loans/views.py"""
from decimal import Decimal
from datetime import date
from dateutil.relativedelta import relativedelta

from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.views import APIView

from .models import LoanProduct, LoanApplication, Loan, LoanRepayment
from .serializers import (
    LoanProductSerializer,
    LoanApplicationSerializer,
    LoanSerializer,
    LoanRepaymentSerializer,
    LoanCalculatorSerializer,
    ApproveApplicationSerializer,
    RejectApplicationSerializer,
)
from django.utils import timezone


class LoanProductViewSet(viewsets.ModelViewSet):
    """Loan products — read-only for members, full CRUD for staff."""
    queryset = LoanProduct.objects.filter(is_active=True)
    serializer_class = LoanProductSerializer
    filter_backends  = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['category', 'is_active']
    search_fields    = ['name', 'description']

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class LoanApplicationViewSet(viewsets.ModelViewSet):
    queryset = LoanApplication.objects.select_related('member', 'loan_product').all()
    serializer_class = LoanApplicationSerializer
    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'loan_product', 'member']
    search_fields    = ['application_number', 'member__member_number', 'member__first_name']
    ordering_fields  = ['applied_at', 'applied_amount']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return LoanApplication.objects.select_related('member', 'loan_product').all()
        return LoanApplication.objects.filter(member=user)

    def perform_create(self, serializer):
        serializer.save(member=self.request.user)

    def _emi(self, principal, annual_rate, months):
        P = float(principal)
        r = float(annual_rate) / 100 / 12
        n = months
        if r == 0:
            return P / n
        return P * r * (1 + r) ** n / ((1 + r) ** n - 1)

    @action(detail=True, methods=['post'], url_path='approve',
            permission_classes=[permissions.IsAdminUser])
    def approve(self, request, pk=None):
        """Approve an application and auto-create the Loan record."""
        application = self.get_object()
        if application.status != LoanApplication.Status.PENDING:
            return Response(
                {'detail': 'Only pending applications can be approved.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        ser = ApproveApplicationSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        data = ser.validated_data

        product = application.loan_product
        rate    = float(product.interest_rate)
        amount  = float(data['approved_amount'])
        months  = data['approved_term']
        emi     = self._emi(amount, rate, months)
        total   = emi * months
        fee     = amount * float(product.processing_fee) / 100
        disburse_date = data['disbursement_date']
        maturity_date = disburse_date + relativedelta(months=months)

        # Update application
        application.status      = LoanApplication.Status.APPROVED
        application.reviewed_at = timezone.now()
        application.reviewed_by = request.user
        application.save()

        # Create loan
        loan = Loan.objects.create(
            application      = application,
            member           = application.member,
            principal        = data['approved_amount'],
            interest_rate    = product.interest_rate,
            term_months      = months,
            monthly_payment  = round(emi, 2),
            total_repayable  = round(total, 2),
            outstanding      = round(total, 2),
            processing_fee   = round(fee, 2),
            disbursement_date = disburse_date,
            maturity_date    = maturity_date,
            disbursed_by     = request.user,
        )
        return Response(LoanSerializer(loan).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'], url_path='reject',
            permission_classes=[permissions.IsAdminUser])
    def reject(self, request, pk=None):
        application = self.get_object()
        ser = RejectApplicationSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        application.status           = LoanApplication.Status.REJECTED
        application.rejection_reason = ser.validated_data['rejection_reason']
        application.reviewed_at      = timezone.now()
        application.reviewed_by      = request.user
        application.save()
        return Response({'detail': 'Application rejected.'})


class LoanViewSet(viewsets.ReadOnlyModelViewSet):
    """Loan records (read-only; created via application approval)."""
    queryset = Loan.objects.select_related('member', 'application').all()
    serializer_class = LoanSerializer
    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'member']
    search_fields    = ['loan_number', 'member__member_number']
    ordering_fields  = ['disbursement_date', 'outstanding']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Loan.objects.all()
        return Loan.objects.filter(member=user)

    @action(detail=True, methods=['post'], url_path='repay')
    def repay(self, request, pk=None):
        """Record a loan repayment."""
        loan = self.get_object()
        if loan.status != Loan.Status.ACTIVE:
            return Response(
                {'detail': 'Can only repay active loans.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        amount = Decimal(str(request.data.get('amount', 0)))
        if amount <= 0:
            return Response({'detail': 'Amount must be positive.'}, status=status.HTTP_400_BAD_REQUEST)
        if amount > loan.outstanding:
            amount = loan.outstanding  # cap at outstanding

        repayment = LoanRepayment.objects.create(
            loan           = loan,
            amount         = amount,
            payment_date   = request.data.get('payment_date', date.today()),
            payment_method = request.data.get('payment_method', 'cash'),
            notes          = request.data.get('notes', ''),
            recorded_by    = request.user,
        )

        loan.outstanding -= amount
        if loan.outstanding <= 0:
            loan.outstanding = Decimal('0')
            loan.status      = Loan.Status.COMPLETED
        loan.save()

        return Response(LoanRepaymentSerializer(repayment).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'], url_path='schedule')
    def schedule(self, request, pk=None):
        """Return the full amortisation schedule for this loan."""
        loan = self.get_object()
        P   = float(loan.principal)
        r   = float(loan.interest_rate) / 100 / 12
        n   = loan.term_months
        emi = float(loan.monthly_payment)

        schedule = []
        balance  = P
        d        = loan.disbursement_date

        for i in range(1, n + 1):
            interest    = balance * r
            principal   = emi - interest
            balance    -= principal
            d           = d + relativedelta(months=1)
            schedule.append({
                'installment': i,
                'due_date':    d.isoformat(),
                'emi':         round(emi, 2),
                'principal':   round(principal, 2),
                'interest':    round(interest, 2),
                'balance':     round(max(balance, 0), 2),
            })

        return Response(schedule)


class LoanCalculatorView(APIView):
    """Stateless EMI calculator — no authentication required."""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        ser = LoanCalculatorSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        return Response(ser.calculate())


class LoanRepaymentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LoanRepayment.objects.select_related('loan__member').all()
    serializer_class = LoanRepaymentSerializer
    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['payment_method', 'loan']
    search_fields    = ['reference', 'loan__loan_number']
    ordering_fields  = ['payment_date', 'amount']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return LoanRepayment.objects.all()
        return LoanRepayment.objects.filter(loan__member=user)
