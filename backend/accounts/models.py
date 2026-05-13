"""
accounts/models.py
Member model (custom user) for KESME SACCO.
"""
import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


def member_photo_path(instance, filename):
    ext = filename.split('.')[-1]
    return f'members/photos/{instance.member_number}.{ext}'


class Member(AbstractUser):
    """
    Central member model. Extends Django's AbstractUser so each member
    can also log in to the member portal.
    """

    class MemberType(models.TextChoices):
        INDIVIDUAL  = 'individual',  'Individual'
        GROUP       = 'group',       'Group / Chama'
        COOPERATIVE = 'cooperative', 'Cooperative'
        FARMER      = 'farmer',      'Smallholder Farmer'
        SME         = 'sme',         'Agribusiness SME'

    class MemberStatus(models.TextChoices):
        PENDING   = 'pending',   'Pending Approval'
        ACTIVE    = 'active',    'Active'
        SUSPENDED = 'suspended', 'Suspended'
        CLOSED    = 'closed',    'Closed'

    class Gender(models.TextChoices):
        MALE   = 'M', 'Male'
        FEMALE = 'F', 'Female'
        OTHER  = 'O', 'Other'

    # ── Identity ──────────────────────────────────────────────────────────
    member_number   = models.CharField(max_length=20, unique=True, blank=True)
    id_number       = models.CharField('National ID / Passport', max_length=20, unique=True)
    date_of_birth   = models.DateField(null=True, blank=True)
    gender          = models.CharField(max_length=1, choices=Gender.choices, blank=True)
    phone           = models.CharField(max_length=15)
    address         = models.TextField(blank=True)
    occupation      = models.CharField(max_length=100, blank=True)
    profile_photo   = models.ImageField(upload_to=member_photo_path, null=True, blank=True)
    id_photo        = models.ImageField(upload_to='members/id_photos/', null=True, blank=True)

    # ── Membership ────────────────────────────────────────────────────────
    member_type     = models.CharField(max_length=15, choices=MemberType.choices, default=MemberType.INDIVIDUAL)
    status          = models.CharField(max_length=15, choices=MemberStatus.choices, default=MemberStatus.PENDING)
    registration_date = models.DateField(default=timezone.now)
    share_capital   = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    # ── Next of Kin ───────────────────────────────────────────────────────
    next_of_kin_name         = models.CharField(max_length=100, blank=True)
    next_of_kin_phone        = models.CharField(max_length=15, blank=True)
    next_of_kin_relationship = models.CharField(max_length=50, blank=True)

    # ── Group membership (if member belongs to a group/chama) ─────────────
    group_name = models.CharField(max_length=100, blank=True)

    class Meta:
        verbose_name = 'Member'
        verbose_name_plural = 'Members'
        ordering = ['-registration_date']

    def __str__(self):
        return f'{self.member_number} – {self.get_full_name() or self.username}'

    def save(self, *args, **kwargs):
        if not self.member_number:
            # Auto-generate member number: KSM-YYYY-NNNN
            year = timezone.now().year
            last = Member.objects.filter(
                member_number__startswith=f'KSM-{year}-'
            ).order_by('member_number').last()
            if last:
                seq = int(last.member_number.split('-')[-1]) + 1
            else:
                seq = 1
            self.member_number = f'KSM-{year}-{seq:04d}'
        super().save(*args, **kwargs)

    @property
    def total_savings(self):
        return sum(acc.balance for acc in self.savings_accounts.filter(status='active'))

    @property
    def active_loans_count(self):
        return self.loans.filter(status='active').count()
