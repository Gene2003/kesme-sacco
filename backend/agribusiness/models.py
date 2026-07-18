"""agribusiness/models.py"""
from django.db import models
from django.conf import settings
from django.utils import timezone


class ValueChain(models.Model):
    """Represents a specific agricultural value chain KESME supports."""
    name        = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    crop_season = models.CharField(
        max_length=100, blank=True,
        help_text='Typical growing/production season e.g. "March–July, October–January"'
    )
    focus_county = models.CharField(max_length=200, blank=True)
    is_active   = models.BooleanField(default=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class AgribusinessApplication(models.Model):

    class FinancingType(models.TextChoices):
        INPUT         = 'input',         'Input Financing'
        SEASONAL      = 'seasonal',      'Seasonal Credit'
        VALUE_CHAIN   = 'value_chain',   'Value Chain Financing'
        POST_HARVEST  = 'post_harvest',  'Post-Harvest Handling'
        EQUIPMENT     = 'equipment',     'Equipment / Irrigation'
        WORKING_CAP   = 'working_cap',   'Working Capital'

    class Status(models.TextChoices):
        PENDING      = 'pending',      'Pending'
        UNDER_REVIEW = 'under_review', 'Under Review'
        APPROVED     = 'approved',     'Approved'
        REJECTED     = 'rejected',     'Rejected'

    member            = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT,
        related_name='agri_applications'
    )
    value_chain       = models.ForeignKey(ValueChain, on_delete=models.PROTECT)
    financing_type    = models.CharField(max_length=15, choices=FinancingType.choices)
    amount_requested  = models.DecimalField(max_digits=12, decimal_places=2)
    farm_size_acres   = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    season            = models.CharField(max_length=50, help_text='e.g. "Long Rains 2025"')
    purpose           = models.TextField(help_text='Describe what the financing will be used for')
    expected_yield    = models.TextField(blank=True, help_text='Expected output and revenue')
    market_linkage    = models.TextField(blank=True, help_text='Who will you sell to?')
    group_name        = models.CharField(max_length=100, blank=True, help_text='If applying as a group')
    status            = models.CharField(max_length=15, choices=Status.choices, default=Status.PENDING)
    applied_at        = models.DateTimeField(default=timezone.now)
    reviewed_at       = models.DateTimeField(null=True, blank=True)
    reviewed_by       = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
        null=True, blank=True, related_name='reviewed_agri_apps'
    )
    rejection_reason  = models.TextField(blank=True)
    staff_notes       = models.TextField(blank=True)

    class Meta:
        verbose_name = 'Agribusiness Application'
        ordering     = ['-applied_at']

    def __str__(self):
        return f'{self.member.member_number} – {self.value_chain.name} ({self.financing_type})'


class FarmerTraining(models.Model):
    """Records of training sessions delivered to members."""

    class TrainingType(models.TextChoices):
        GAP          = 'gap',          'Good Agricultural Practices'
        POST_HARVEST = 'post_harvest',  'Post-Harvest Management'
        FINANCIAL    = 'financial',    'Financial Literacy'
        BUSINESS     = 'business',     'Business Development'
        MARKET       = 'market',       'Market Linkages'
        COOPERATIVE  = 'cooperative',  'Cooperative Governance'

    title        = models.CharField(max_length=200)
    training_type = models.CharField(max_length=15, choices=TrainingType.choices)
    value_chain  = models.ForeignKey(ValueChain, on_delete=models.SET_NULL, null=True, blank=True)
    description  = models.TextField()
    venue        = models.CharField(max_length=200)
    scheduled_date = models.DateField()
    attendees    = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name='trainings_attended',
        blank=True
    )
    facilitator  = models.CharField(max_length=100, blank=True)
    is_completed = models.BooleanField(default=False)
    notes        = models.TextField(blank=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Farmer Training'
        ordering     = ['-scheduled_date']

    def __str__(self):
        return f'{self.title} ({self.scheduled_date})'
