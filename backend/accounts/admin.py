"""accounts/admin.py"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Member


@admin.register(Member)
class MemberAdmin(UserAdmin):
    list_display  = [
        'member_number', 'get_full_name', 'id_number', 'phone',
        'member_type', 'status', 'share_capital', 'registration_date',
    ]
    list_filter   = ['status', 'member_type', 'gender', 'registration_date']
    search_fields = ['member_number', 'first_name', 'last_name', 'id_number', 'phone', 'email']
    ordering      = ['-registration_date']
    readonly_fields = ['member_number', 'date_joined', 'last_login']

    fieldsets = (
        ('Login Credentials', {'fields': ('username', 'password')}),
        ('Personal Info', {
            'fields': (
                'first_name', 'last_name', 'email',
                'id_number', 'date_of_birth', 'gender',
                'phone', 'address', 'occupation', 'profile_photo',
            )
        }),
        ('Membership', {
            'fields': (
                'member_number', 'member_type', 'status',
                'registration_date', 'share_capital', 'group_name',
            )
        }),
        ('Next of Kin', {
            'fields': (
                'next_of_kin_name', 'next_of_kin_phone', 'next_of_kin_relationship',
            )
        }),
        ('System', {
            'fields': ('is_staff', 'is_superuser', 'groups', 'user_permissions',
                       'date_joined', 'last_login'),
            'classes': ('collapse',),
        }),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username', 'email', 'first_name', 'last_name',
                'id_number', 'phone', 'member_type',
                'password1', 'password2',
            ),
        }),
    )

    actions = ['activate_members', 'suspend_members']

    def activate_members(self, request, queryset):
        queryset.update(status=Member.MemberStatus.ACTIVE)
        self.message_user(request, f'{queryset.count()} member(s) activated.')
    activate_members.short_description = 'Activate selected members'

    def suspend_members(self, request, queryset):
        queryset.update(status=Member.MemberStatus.SUSPENDED)
        self.message_user(request, f'{queryset.count()} member(s) suspended.')
    suspend_members.short_description = 'Suspend selected members'
