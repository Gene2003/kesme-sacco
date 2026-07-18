"""savings/views.py"""
from decimal import Decimal
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import SavingsAccount, SavingsTransaction, FixedDeposit
from .serializers import (
    SavingsAccountSerializer,
    SavingsAccountListSerializer,
    SavingsTransactionSerializer,
    DepositWithdrawSerializer,
    FixedDepositSerializer,
)


class SavingsAccountViewSet(viewsets.ModelViewSet):
    queryset = SavingsAccount.objects.select_related('member').all()
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'account_type', 'member']
    search_fields    = ['account_number', 'member__member_number', 'member__first_name']
    ordering_fields  = ['balance', 'opened_at', 'last_activity']

    def get_serializer_class(self):
        if self.action == 'list':
            return SavingsAccountListSerializer
        return SavingsAccountSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return SavingsAccount.objects.select_related('member').all()
        return SavingsAccount.objects.filter(member=user)

    def _apply_transaction(self, account, tx_type, data, request):
        """Helper to deposit or withdraw from an account."""
        ser = DepositWithdrawSerializer(data=data)
        ser.is_valid(raise_exception=True)
        amount = Decimal(str(ser.validated_data['amount']))

        if tx_type == SavingsTransaction.TxType.WITHDRAWAL:
            if amount > account.balance:
                return Response(
                    {'detail': 'Insufficient balance.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            account.balance -= amount
        else:
            account.balance += amount

        account.save()

        tx = SavingsTransaction.objects.create(
            account=account,
            transaction_type=tx_type,
            amount=amount,
            balance_after=account.balance,
            payment_method=ser.validated_data['payment_method'],
            description=ser.validated_data.get('description', ''),
            recorded_by=request.user,
        )
        return Response(SavingsTransactionSerializer(tx).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'], url_path='deposit')
    def deposit(self, request, pk=None):
        account = self.get_object()
        return self._apply_transaction(account, SavingsTransaction.TxType.DEPOSIT, request.data, request)

    @action(detail=True, methods=['post'], url_path='withdraw')
    def withdraw(self, request, pk=None):
        account = self.get_object()
        return self._apply_transaction(account, SavingsTransaction.TxType.WITHDRAWAL, request.data, request)

    @action(detail=True, methods=['get'], url_path='statement')
    def statement(self, request, pk=None):
        """Return last 50 transactions for this account."""
        account = self.get_object()
        txns    = account.transactions.order_by('-created_at')[:50]
        return Response(SavingsTransactionSerializer(txns, many=True).data)


class SavingsTransactionViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only transaction log — staff sees all, members see theirs."""
    queryset = SavingsTransaction.objects.select_related('account__member').all()
    serializer_class = SavingsTransactionSerializer
    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['transaction_type', 'payment_method', 'account']
    search_fields    = ['reference', 'account__account_number']
    ordering_fields  = ['created_at', 'amount']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return SavingsTransaction.objects.all()
        return SavingsTransaction.objects.filter(account__member=user)


class FixedDepositViewSet(viewsets.ModelViewSet):
    queryset = FixedDeposit.objects.select_related('member').all()
    serializer_class = FixedDepositSerializer
    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'member']
    search_fields    = ['account_number', 'member__member_number']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return FixedDeposit.objects.all()
        return FixedDeposit.objects.filter(member=user)
