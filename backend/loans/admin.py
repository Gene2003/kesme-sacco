"""loans/admin.py"""
from django.contrib import admin
from .models import LoanProduct, LoanApplication, Loan, LoanRepayment


@admin.register(LoanProduct)
class LoanProductAdmin(admin.ModelAdmin):
    list_display  = ['name', 'category', 'min_amount', 'max_amount', 'interest_rate', 'max_term_months', 'is_active']
    list_filter   = ['category', 'is_active']
    search_fields = ['name']


@admin.register(LoanApplication)
class LoanApplicationAdmin(admin.ModelAdmin):
    list_display  = ['application_number', 'member', 'loan_product', 'applied_amount', 'applied_term', 'status', 'applied_at']
    list_filter   = ['status', 'loan_product']
    search_fields = ['application_number', 'member__member_number', 'member__first_name']
    readonly_fields = ['application_number', 'applied_at']
    actions = ['mark_under_review']

    def mark_under_review(self, request, queryset):
        queryset.filter(status='pending').update(status='under_review')
        self.message_user(request, 'Applications marked as under review.')
    mark_under_review.short_description = 'Mark selected as Under Review'


@admin.register(Loan)
class LoanAdmin(admin.ModelAdmin):
    list_display  = ['loan_number', 'member', 'principal', 'outstanding', 'monthly_payment', 'disbursement_date', 'maturity_date', 'status']
    list_filter   = ['status']
    search_fields = ['loan_number', 'member__member_number']
    readonly_fields = ['loan_number']


@admin.register(LoanRepayment)
class LoanRepaymentAdmin(admin.ModelAdmin):
    list_display  = ['reference', 'loan', 'amount', 'payment_date', 'payment_method', 'created_at']
    list_filter   = ['payment_method', 'payment_date']
    search_fields = ['reference', 'loan__loan_number']
    readonly_fields = ['reference', 'created_at']
