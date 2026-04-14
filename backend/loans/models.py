"""loans/models.py"""
import uuid
from decimal import Decimal
from django.db import models
from django.conf import settings
from django.utils import timezone


class LoanProduct(models.Model):
    """Master table of all loan product types offered by the SACCO."""

    class Category(models.TextChoices):
        DEVELOPMENT  = 'development',  'Development Loan'
        EMERGENCY    = 'emergency',    'Emergency Loan'
        AGRIBUSINESS = 'agribusiness', 'Agribusiness Loan'
        SME          = 'sme',          'SME Loan'
        GROUP        = 'group',        'Group / Table Banking Loan'
        STARTUP      = 'startup',      'Start-Up Loan'

    name             = models.CharField(max_length=100)
    category         = models.CharField(max_length=15, choices=Category.choices)
    description      = models.TextField()
    min_amount       = models.DecimalField(max_digits=12, decimal_places=2)
    max_amount       = models.DecimalField(max_digits=12, decimal_places=2)
    interest_rate    = models.DecimalField(
        max_digits=5, decimal_places=2,
        help_text='Annual interest rate %'
    )
    min_term_months  = models.PositiveIntegerField(default=1)
    max_term_months  = models.PositiveIntegerField(default=36)
    processing_fee   = models.DecimalField(
        max_digits=5, decimal_places=2, default=2.00,
        help_text='Processing fee as % of loan amount'
    )
    min_savings_months = models.PositiveIntegerField(
        default=3,
        help_text='Minimum months of savings history required'
    )
    is_active        = models.BooleanField(default=True)
    created_at       = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Loan Product'
        ordering     = ['name']

    def __str__(self):
        return f'{self.name} ({self.interest_rate}% p.a.)'


class LoanApplication(models.Model):

    class Status(models.TextChoices):
        PENDING      = 'pending',      'Pending'
        UNDER_REVIEW = 'under_review', 'Under Review'
        APPROVED     = 'approved',     'Approved'
        REJECTED     = 'rejected',     'Rejected'
        CANCELLED    = 'cancelled',    'Cancelled'

    member           = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT,
        related_name='loan_applications'
    )
    loan_product     = models.ForeignKey(LoanProduct, on_delete=models.PROTECT)
    application_number = models.CharField(max_length=20, unique=True, blank=True)
    applied_amount   = models.DecimalField(max_digits=12, decimal_places=2)
    applied_term     = models.PositiveIntegerField(help_text='Term in months')
    purpose          = models.TextField()
    collateral       = models.TextField(blank=True, help_text='Describe collateral offered, if any')
    status           = models.CharField(max_length=15, choices=Status.choices, default=Status.PENDING)
    applied_at       = models.DateTimeField(default=timezone.now)
    reviewed_at      = models.DateTimeField(null=True, blank=True)
    reviewed_by      = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
        null=True, blank=True, related_name='reviewed_applications'
    )
    rejection_reason = models.TextField(blank=True)
    notes            = models.TextField(blank=True)

    class Meta:
        verbose_name = 'Loan Application'
        ordering     = ['-applied_at']

    def __str__(self):
        return f'{self.application_number} – {self.member.member_number}'

    def save(self, *args, **kwargs):
        if not self.application_number:
            year = timezone.now().year
            last = LoanApplication.objects.filter(
                application_number__startswith=f'APP-{year}-'
            ).order_by('application_number').last()
            seq = int(last.application_number.split('-')[-1]) + 1 if last else 1
            self.application_number = f'APP-{year}-{seq:05d}'
        super().save(*args, **kwargs)


class Loan(models.Model):

    class Status(models.TextChoices):
        ACTIVE    = 'active',    'Active'
        COMPLETED = 'completed', 'Completed'
        DEFAULTED = 'defaulted', 'Defaulted'
        WRITTEN_OFF = 'written_off', 'Written Off'

    application      = models.OneToOneField(LoanApplication, on_delete=models.PROTECT)
    member           = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT,
        related_name='loans'
    )
    loan_number      = models.CharField(max_length=20, unique=True, blank=True)
    principal        = models.DecimalField(max_digits=12, decimal_places=2)
    interest_rate    = models.DecimalField(max_digits=5, decimal_places=2)
    term_months      = models.PositiveIntegerField()
    monthly_payment  = models.DecimalField(max_digits=12, decimal_places=2)
    total_repayable  = models.DecimalField(max_digits=12, decimal_places=2)
    outstanding      = models.DecimalField(max_digits=12, decimal_places=2)
    processing_fee   = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    disbursement_date = models.DateField()
    maturity_date    = models.DateField()
    status           = models.CharField(max_length=15, choices=Status.choices, default=Status.ACTIVE)
    disbursed_by     = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
        null=True, related_name='disbursed_loans'
    )

    class Meta:
        verbose_name = 'Loan'
        ordering     = ['-disbursement_date']

    def __str__(self):
        return f'{self.loan_number} – KES {self.principal}'

    def save(self, *args, **kwargs):
        if not self.loan_number:
            year = timezone.now().year
            last = Loan.objects.filter(
                loan_number__startswith=f'LN-{year}-'
            ).order_by('loan_number').last()
            seq = int(last.loan_number.split('-')[-1]) + 1 if last else 1
            self.loan_number = f'LN-{year}-{seq:05d}'
        super().save(*args, **kwargs)

    @property
    def amount_paid(self):
        return sum(r.amount for r in self.repayments.all())

    @property
    def arrears(self):
        """Amount overdue (outstanding vs expected per schedule)."""
        return max(Decimal('0'), self.outstanding - self._expected_outstanding())

    def _expected_outstanding(self):
        from dateutil.relativedelta import relativedelta
        months_elapsed = 0
        d = self.disbursement_date
        today = timezone.now().date()
        while d <= today:
            d += relativedelta(months=1)
            months_elapsed += 1
        expected_paid = self.monthly_payment * min(months_elapsed, self.term_months)
        return max(Decimal('0'), self.total_repayable - expected_paid)


class LoanRepayment(models.Model):

    class PaymentMethod(models.TextChoices):
        MPESA = 'mpesa', 'M-Pesa'
        BANK  = 'bank',  'Bank Transfer'
        CASH  = 'cash',  'Cash'

    loan           = models.ForeignKey(Loan, on_delete=models.PROTECT, related_name='repayments')
    amount         = models.DecimalField(max_digits=12, decimal_places=2)
    payment_date   = models.DateField(default=timezone.now)
    reference      = models.CharField(max_length=50, unique=True, blank=True)
    payment_method = models.CharField(max_length=10, choices=PaymentMethod.choices)
    recorded_by    = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
        null=True, related_name='recorded_repayments'
    )
    notes          = models.TextField(blank=True)
    created_at     = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = 'Loan Repayment'
        ordering     = ['-payment_date']

    def __str__(self):
        return f'{self.reference} – KES {self.amount}'

    def save(self, *args, **kwargs):
        if not self.reference:
            self.reference = f'RPY-{uuid.uuid4().hex[:10].upper()}'
        super().save(*args, **kwargs)
