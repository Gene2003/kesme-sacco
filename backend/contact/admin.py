"""contact/admin.py"""
from django.contrib import admin
from django.utils import timezone
from .models import ContactInquiry, WaitlistEntry


@admin.register(WaitlistEntry)
class WaitlistEntryAdmin(admin.ModelAdmin):
    list_display  = ['name', 'email', 'phone', 'status', 'created_at']
    list_filter   = ['status', 'created_at']
    search_fields = ['name', 'email', 'phone']
    readonly_fields = ['created_at']
    date_hierarchy = 'created_at'
    actions = ['mark_notified', 'mark_converted']

    def mark_notified(self, request, queryset):
        queryset.update(status=WaitlistEntry.Status.NOTIFIED)
        self.message_user(request, f'{queryset.count()} entry(ies) marked as notified.')
    mark_notified.short_description = 'Mark as Notified'

    def mark_converted(self, request, queryset):
        queryset.update(status=WaitlistEntry.Status.CONVERTED)
        self.message_user(request, f'{queryset.count()} entry(ies) marked as converted.')
    mark_converted.short_description = 'Mark as Converted to Member'


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display  = ['full_name', 'email', 'phone', 'subject', 'status', 'created_at']
    list_filter   = ['status', 'subject', 'created_at']
    search_fields = ['first_name', 'last_name', 'email', 'phone']
    readonly_fields = ['created_at', 'resolved_at']
    date_hierarchy = 'created_at'
    actions = ['mark_resolved', 'mark_in_progress']

    def mark_resolved(self, request, queryset):
        queryset.update(status=ContactInquiry.Status.RESOLVED, resolved_at=timezone.now())
        self.message_user(request, f'{queryset.count()} inquiry(ies) resolved.')
    mark_resolved.short_description = 'Mark as Resolved'

    def mark_in_progress(self, request, queryset):
        queryset.update(status=ContactInquiry.Status.IN_PROGRESS)
        self.message_user(request, f'{queryset.count()} inquiry(ies) set to In Progress.')
    mark_in_progress.short_description = 'Mark as In Progress'
