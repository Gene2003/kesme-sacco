"""savings/models.py"""
import uuid
from django.db import models
from django.conf import settings
from django.utils import timezone


def _generate_account_number(prefix):
    """Return a unique account number like SAV-20240001."""
    year = timezone.now().year
    model_map = {'SAV': SavingsAccount, 'FXD': FixedDeposit}
    Model = model_map[prefix]
    last = Model.objects.filter(
        account_number__startswith=f'{prefix}-{year}-'
    ).order_by('account_number').last()
    seq = int(last.account_number.split('-')[-1]) + 1 if last else 1
    return f'{prefix}-{year}-{seq:05d}'


class SavingsAccount(models.Model):

    class AccountType(models.TextChoices):
        REGULAR = 'regular', 'Regular Savings'
        GROUP   = 'group',   'Group Savings'
        SOCIAL  = 'social',  'Social Savings'

    class Status(models.TextChoices):
        ACTIVE   = 'active',   'Active'
        DORMANT  = 'dormant',  'Dormant'
        CLOSED   = 'closed',   'Closed'

    member         = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT,
        related_name='savings_accounts'
    )
    account_number = models.CharField(max_length=20, unique=True, blank=True)
    account_type   = models.CharField(max_length=10, choices=AccountType.choices, default=AccountType.REGULAR)
    balance        = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    interest_rate  = models.DecimalField(
        max_digits=5, decimal_places=2, default=5.00,
        help_text='Annual interest rate %'
    )
    status         = models.CharField(max_length=10, choices=Status.choices, default=Status.ACTIVE)
    opened_at      = models.DateTimeField(default=timezone.now)
    last_activity  = models.DateTimeField(auto_now=True)
    notes          = models.TextField(blank=True)

    class Meta:
        verbose_name = 'Savings Account'
        ordering     = ['-opened_at']

    def __str__(self):
        return f'{self.account_number} ({self.member.member_number})'

    def save(self, *args, **kwargs):
        if not self.account_number:
            self.account_number = _generate_account_number('SAV')
        super().save(*args, **kwargs)


class SavingsTransaction(models.Model):

    class TxType(models.TextChoices):
        DEPOSIT    = 'deposit',    'Deposit'
        WITHDRAWAL = 'withdrawal', 'Withdrawal'
        INTEREST   = 'interest',   'Interest Credit'
        TRANSFER   = 'transfer',   'Transfer'

    class PaymentMethod(models.TextChoices):
        MPESA    = 'mpesa',    'M-Pesa'
        BANK     = 'bank',     'Bank Transfer'
        CASH     = 'cash',     'Cash'
        INTERNAL = 'internal', 'Internal Transfer'

    account          = models.ForeignKey(SavingsAccount, on_delete=models.PROTECT, related_name='transactions')
    transaction_type = models.CharField(max_length=15, choices=TxType.choices)
    amount           = models.DecimalField(max_digits=14, decimal_places=2)
    balance_after    = models.DecimalField(max_digits=14, decimal_places=2)
    reference        = models.CharField(max_length=50, unique=True, blank=True)
    payment_method   = models.CharField(max_length=10, choices=PaymentMethod.choices, default=PaymentMethod.CASH)
    description      = models.CharField(max_length=255, blank=True)
    recorded_by      = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
        null=True, related_name='recorded_savings_txns'
    )
    created_at       = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = 'Savings Transaction'
        ordering     = ['-created_at']

    def __str__(self):
        return f'{self.reference} | {self.transaction_type} {self.amount}'

    def save(self, *args, **kwargs):
        if not self.reference:
            self.reference = f'STX-{uuid.uuid4().hex[:10].upper()}'
        super().save(*args, **kwargs)


class FixedDeposit(models.Model):

    class Status(models.TextChoices):
        ACTIVE    = 'active',    'Active'
        MATURED   = 'matured',   'Matured'
        WITHDRAWN = 'withdrawn', 'Withdrawn'

    member           = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT,
        related_name='fixed_deposits'
    )
    account_number   = models.CharField(max_length=20, unique=True, blank=True)
    principal_amount = models.DecimalField(max_digits=14, decimal_places=2)
    interest_rate    = models.DecimalField(
        max_digits=5, decimal_places=2,
        help_text='Annual interest rate %'
    )
    term_months      = models.PositiveIntegerField()
    start_date       = models.DateField(default=timezone.now)
    maturity_date    = models.DateField()
    interest_earned  = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    status           = models.CharField(max_length=10, choices=Status.choices, default=Status.ACTIVE)
    notes            = models.TextField(blank=True)

    class Meta:
        verbose_name = 'Fixed Deposit'
        ordering     = ['-start_date']

    def __str__(self):
        return f'{self.account_number} – KES {self.principal_amount}'

    def save(self, *args, **kwargs):
        if not self.account_number:
            self.account_number = _generate_account_number('FXD')
        super().save(*args, **kwargs)

    @property
    def maturity_value(self):
        """Simple interest maturity value."""
        rate   = float(self.interest_rate) / 100
        months = self.term_months
        return float(self.principal_amount) * (1 + rate * months / 12)
