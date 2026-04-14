"""agribusiness/serializers.py"""
from rest_framework import serializers
from .models import ValueChain, AgribusinessApplication, FarmerTraining


class ValueChainSerializer(serializers.ModelSerializer):
    application_count = serializers.SerializerMethodField()

    class Meta:
        model  = ValueChain
        fields = [
            'id', 'name', 'description', 'crop_season',
            'focus_county', 'is_active', 'application_count',
        ]

    def get_application_count(self, obj):
        return obj.agribusinessapplication_set.count()


class AgribusinessApplicationSerializer(serializers.ModelSerializer):
    member_name      = serializers.SerializerMethodField()
    value_chain_name = serializers.SerializerMethodField()

    class Meta:
        model  = AgribusinessApplication
        fields = [
            'id', 'member', 'member_name', 'value_chain', 'value_chain_name',
            'financing_type', 'amount_requested', 'farm_size_acres',
            'season', 'purpose', 'expected_yield', 'market_linkage',
            'group_name', 'status', 'applied_at',
            'reviewed_at', 'reviewed_by', 'rejection_reason',
        ]
        read_only_fields = [
            'status', 'applied_at', 'reviewed_at', 'reviewed_by', 'rejection_reason',
        ]

    def get_member_name(self, obj):
        return obj.member.get_full_name() or obj.member.username

    def get_value_chain_name(self, obj):
        return obj.value_chain.name


class FarmerTrainingSerializer(serializers.ModelSerializer):
    attendee_count = serializers.SerializerMethodField()
    value_chain_name = serializers.SerializerMethodField()

    class Meta:
        model  = FarmerTraining
        fields = [
            'id', 'title', 'training_type', 'value_chain', 'value_chain_name',
            'description', 'venue', 'scheduled_date', 'attendees',
            'attendee_count', 'facilitator', 'is_completed', 'notes', 'created_at',
        ]
        read_only_fields = ['created_at']

    def get_attendee_count(self, obj):
        return obj.attendees.count()

    def get_value_chain_name(self, obj):
        return obj.value_chain.name if obj.value_chain else None
