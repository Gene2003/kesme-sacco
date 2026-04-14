"""contact/models.py"""
from django.db import models
from django.utils import timezone


class ContactInquiry(models.Model):

    class Subject(models.TextChoices):
        MEMBERSHIP    = 'membership',    'Membership Inquiry'
        LOAN          = 'loan',          'Loan / Credit Products'
        SAVINGS       = 'savings',       'Savings Products'
        AGRIBUSINESS  = 'agribusiness',  'Agribusiness Financing'
        TRAINING      = 'training',      'Financial Training'
        MARKETS       = 'markets',       'Market Linkages'
        PARTNERSHIP   = 'partnership',   'Partnership Inquiry'
        GENERAL       = 'general',       'General Inquiry'

    class Status(models.TextChoices):
        NEW      = 'new',      'New'
        IN_PROGRESS = 'in_progress', 'In Progress'
        RESOLVED = 'resolved', 'Resolved'

    first_name  = models.CharField(max_length=80)
    last_name   = models.CharField(max_length=80)
    email       = models.EmailField()
    phone       = models.CharField(max_length=20, blank=True)
    subject     = models.CharField(max_length=20, choices=Subject.choices, default=Subject.GENERAL)
    message     = models.TextField()
    status      = models.CharField(max_length=15, choices=Status.choices, default=Status.NEW)
    notes       = models.TextField(blank=True, help_text='Internal staff notes')
    resolved_at = models.DateTimeField(null=True, blank=True)
    created_at  = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = 'Contact Inquiry'
        verbose_name_plural = 'Contact Inquiries'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.first_name} {self.last_name} – {self.subject} ({self.created_at.date()})'

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'
