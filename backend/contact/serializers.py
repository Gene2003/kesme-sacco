"""contact/serializers.py"""
from rest_framework import serializers
from .models import ContactInquiry


class ContactInquirySerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()

    class Meta:
        model  = ContactInquiry
        fields = [
            'id', 'first_name', 'last_name', 'full_name',
            'email', 'phone', 'subject', 'message',
            'status', 'notes', 'resolved_at', 'created_at',
        ]
        read_only_fields = ['status', 'notes', 'resolved_at', 'created_at']


class ContactInquiryAdminSerializer(serializers.ModelSerializer):
    """Full serializer for staff — includes internal notes."""
    full_name = serializers.ReadOnlyField()

    class Meta:
        model  = ContactInquiry
        fields = '__all__'
        read_only_fields = ['created_at']
