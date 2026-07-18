"""agribusiness/admin.py"""
from django.contrib import admin
from django.utils import timezone
from .models import ValueChain, AgribusinessApplication, FarmerTraining


@admin.register(ValueChain)
class ValueChainAdmin(admin.ModelAdmin):
    list_display  = ['name', 'crop_season', 'focus_county', 'is_active']
    list_filter   = ['is_active']
    search_fields = ['name', 'description']


@admin.register(AgribusinessApplication)
class AgribusinessApplicationAdmin(admin.ModelAdmin):
    list_display  = ['member', 'value_chain', 'financing_type', 'amount_requested', 'season', 'status', 'applied_at']
    list_filter   = ['status', 'financing_type', 'value_chain']
    search_fields = ['member__member_number', 'member__first_name', 'season']
    readonly_fields = ['applied_at', 'reviewed_at']
    actions = ['approve_applications', 'reject_applications']

    def approve_applications(self, request, queryset):
        queryset.filter(status='pending').update(
            status='approved',
            reviewed_at=timezone.now(),
            reviewed_by=request.user,
        )
        self.message_user(request, 'Selected applications approved.')
    approve_applications.short_description = 'Approve selected applications'

    def reject_applications(self, request, queryset):
        queryset.filter(status='pending').update(
            status='rejected',
            reviewed_at=timezone.now(),
        )
        self.message_user(request, 'Selected applications rejected.')
    reject_applications.short_description = 'Reject selected applications'


@admin.register(FarmerTraining)
class FarmerTrainingAdmin(admin.ModelAdmin):
    list_display  = ['title', 'training_type', 'value_chain', 'venue', 'scheduled_date', 'is_completed']
    list_filter   = ['training_type', 'is_completed', 'value_chain']
    search_fields = ['title', 'venue', 'facilitator']
    filter_horizontal = ['attendees']
    readonly_fields = ['created_at']
