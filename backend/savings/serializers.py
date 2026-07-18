"""savings/serializers.py"""
from rest_framework import serializers
from .models import SavingsAccount, SavingsTransaction, FixedDeposit


class SavingsTransactionSerializer(serializers.ModelSerializer):
    recorded_by_name = serializers.SerializerMethodField()

    class Meta:
        model  = SavingsTransaction
        fields = [
            'id', 'account', 'transaction_type', 'amount', 'balance_after',
            'reference', 'payment_method', 'description',
            'recorded_by', 'recorded_by_name', 'created_at',
        ]
        read_only_fields = ['reference', 'balance_after', 'recorded_by', 'created_at']

    def get_recorded_by_name(self, obj):
        return obj.recorded_by.get_full_name() if obj.recorded_by else None


class SavingsAccountSerializer(serializers.ModelSerializer):
    member_name   = serializers.SerializerMethodField()
    transactions  = SavingsTransactionSerializer(many=True, read_only=True)

    class Meta:
        model  = SavingsAccount
        fields = [
            'id', 'account_number', 'member', 'member_name',
            'account_type', 'balance', 'interest_rate',
            'status', 'opened_at', 'last_activity', 'notes',
            'transactions',
        ]
        read_only_fields = ['account_number', 'balance', 'opened_at', 'last_activity']

    def get_member_name(self, obj):
        return obj.member.get_full_name() or obj.member.username


class SavingsAccountListSerializer(serializers.ModelSerializer):
    """Lightweight for list views."""
    member_name = serializers.SerializerMethodField()

    class Meta:
        model  = SavingsAccount
        fields = [
            'id', 'account_number', 'member', 'member_name',
            'account_type', 'balance', 'status', 'last_activity',
        ]

    def get_member_name(self, obj):
        return obj.member.get_full_name() or obj.member.username


class DepositWithdrawSerializer(serializers.Serializer):
    """Used for deposit and withdrawal actions."""
    amount         = serializers.DecimalField(max_digits=14, decimal_places=2, min_value=1)
    payment_method = serializers.ChoiceField(choices=SavingsTransaction.PaymentMethod.choices)
    description    = serializers.CharField(required=False, allow_blank=True)


class FixedDepositSerializer(serializers.ModelSerializer):
    member_name   = serializers.SerializerMethodField()
    maturity_value = serializers.ReadOnlyField()

    class Meta:
        model  = FixedDeposit
        fields = [
            'id', 'account_number', 'member', 'member_name',
            'principal_amount', 'interest_rate', 'term_months',
            'start_date', 'maturity_date', 'interest_earned',
            'status', 'notes', 'maturity_value',
        ]
        read_only_fields = ['account_number', 'interest_earned', 'status']

    def get_member_name(self, obj):
        return obj.member.get_full_name() or obj.member.username
