"""loans/serializers.py"""
from decimal import Decimal
import math
from rest_framework import serializers
from .models import LoanProduct, LoanApplication, Loan, LoanRepayment


class LoanProductSerializer(serializers.ModelSerializer):
    class Meta:
        model  = LoanProduct
        fields = '__all__'


class LoanApplicationSerializer(serializers.ModelSerializer):
    member_name  = serializers.SerializerMethodField()
    product_name = serializers.SerializerMethodField()

    class Meta:
        model  = LoanApplication
        fields = [
            'id', 'application_number', 'member', 'member_name',
            'loan_product', 'product_name',
            'applied_amount', 'applied_term', 'purpose', 'collateral',
            'status', 'applied_at', 'reviewed_at', 'reviewed_by',
            'rejection_reason', 'notes',
        ]
        read_only_fields = [
            'application_number', 'status',
            'reviewed_at', 'reviewed_by', 'rejection_reason',
        ]

    def get_member_name(self, obj):
        return obj.member.get_full_name() or obj.member.username

    def get_product_name(self, obj):
        return obj.loan_product.name


class LoanRepaymentSerializer(serializers.ModelSerializer):
    recorded_by_name = serializers.SerializerMethodField()

    class Meta:
        model  = LoanRepayment
        fields = [
            'id', 'loan', 'amount', 'payment_date', 'reference',
            'payment_method', 'recorded_by', 'recorded_by_name',
            'notes', 'created_at',
        ]
        read_only_fields = ['reference', 'recorded_by', 'created_at']

    def get_recorded_by_name(self, obj):
        return obj.recorded_by.get_full_name() if obj.recorded_by else None


class LoanSerializer(serializers.ModelSerializer):
    member_name  = serializers.SerializerMethodField()
    repayments   = LoanRepaymentSerializer(many=True, read_only=True)
    amount_paid  = serializers.ReadOnlyField()

    class Meta:
        model  = Loan
        fields = [
            'id', 'loan_number', 'application', 'member', 'member_name',
            'principal', 'interest_rate', 'term_months',
            'monthly_payment', 'total_repayable', 'outstanding',
            'processing_fee', 'disbursement_date', 'maturity_date',
            'status', 'disbursed_by', 'repayments', 'amount_paid',
        ]
        read_only_fields = [
            'loan_number', 'monthly_payment', 'total_repayable',
            'outstanding', 'disbursed_by',
        ]

    def get_member_name(self, obj):
        return obj.member.get_full_name() or obj.member.username


class LoanCalculatorSerializer(serializers.Serializer):
    """Stateless EMI calculator — does not touch the database."""
    principal    = serializers.DecimalField(max_digits=12, decimal_places=2, min_value=1000)
    annual_rate  = serializers.DecimalField(max_digits=5, decimal_places=2, min_value=0.1)
    term_months  = serializers.IntegerField(min_value=1, max_value=120)

    def calculate(self):
        P = float(self.validated_data['principal'])
        r = float(self.validated_data['annual_rate']) / 100 / 12
        n = self.validated_data['term_months']

        if r == 0:
            emi = P / n
        else:
            emi = P * r * (1 + r) ** n / ((1 + r) ** n - 1)

        total   = emi * n
        interest = total - P
        return {
            'principal':       round(P, 2),
            'annual_rate':     float(self.validated_data['annual_rate']),
            'term_months':     n,
            'monthly_payment': round(emi, 2),
            'total_repayable': round(total, 2),
            'total_interest':  round(interest, 2),
        }


class ApproveApplicationSerializer(serializers.Serializer):
    approved_amount = serializers.DecimalField(max_digits=12, decimal_places=2, min_value=1)
    approved_term   = serializers.IntegerField(min_value=1, max_value=120)
    disbursement_date = serializers.DateField()


class RejectApplicationSerializer(serializers.Serializer):
    rejection_reason = serializers.CharField(min_length=10)
