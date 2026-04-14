"""savings/admin.py"""
from django.contrib import admin
from .models import SavingsAccount, SavingsTransaction, FixedDeposit


@admin.register(SavingsAccount)
class SavingsAccountAdmin(admin.ModelAdmin):
    list_display  = ['account_number', 'member', 'account_type', 'balance', 'status', 'opened_at']
    list_filter   = ['account_type', 'status']
    search_fields = ['account_number', 'member__member_number', 'member__first_name', 'member__last_name']
    readonly_fields = ['account_number', 'opened_at', 'last_activity']


@admin.register(SavingsTransaction)
class SavingsTransactionAdmin(admin.ModelAdmin):
    list_display  = ['reference', 'account', 'transaction_type', 'amount', 'balance_after', 'payment_method', 'created_at']
    list_filter   = ['transaction_type', 'payment_method', 'created_at']
    search_fields = ['reference', 'account__account_number']
    readonly_fields = ['reference', 'created_at']


@admin.register(FixedDeposit)
class FixedDepositAdmin(admin.ModelAdmin):
    list_display  = ['account_number', 'member', 'principal_amount', 'interest_rate', 'term_months', 'maturity_date', 'status']
    list_filter   = ['status']
    search_fields = ['account_number', 'member__member_number']
    readonly_fields = ['account_number']
