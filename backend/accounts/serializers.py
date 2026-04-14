"""accounts/serializers.py"""
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import Member


class MemberListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views."""
    full_name = serializers.SerializerMethodField()

    class Meta:
        model  = Member
        fields = [
            'id', 'member_number', 'full_name', 'phone',
            'member_type', 'status', 'registration_date',
            'share_capital',
        ]

    def get_full_name(self, obj):
        return obj.get_full_name() or obj.username


class MemberDetailSerializer(serializers.ModelSerializer):
    """Full serializer for detail / profile views."""
    full_name        = serializers.SerializerMethodField()
    total_savings    = serializers.ReadOnlyField()
    active_loans_count = serializers.ReadOnlyField()

    class Meta:
        model  = Member
        fields = [
            'id', 'member_number', 'username', 'email',
            'first_name', 'last_name', 'full_name',
            'id_number', 'date_of_birth', 'gender', 'phone',
            'address', 'occupation', 'profile_photo',
            'member_type', 'status', 'registration_date',
            'share_capital', 'group_name',
            'next_of_kin_name', 'next_of_kin_phone', 'next_of_kin_relationship',
            'total_savings', 'active_loans_count',
            'date_joined', 'last_login',
        ]
        read_only_fields = [
            'member_number', 'status', 'share_capital',
            'date_joined', 'last_login',
        ]

    def get_full_name(self, obj):
        return obj.get_full_name() or obj.username


class MemberRegistrationSerializer(serializers.ModelSerializer):
    """Used for creating a new member account."""
    password  = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, label='Confirm password')

    class Meta:
        model  = Member
        fields = [
            'username', 'email', 'first_name', 'last_name',
            'id_number', 'phone', 'date_of_birth', 'gender',
            'address', 'occupation', 'member_type', 'group_name',
            'next_of_kin_name', 'next_of_kin_phone', 'next_of_kin_relationship',
            'password', 'password2',
        ]

    def validate(self, attrs):
        if attrs['password'] != attrs.pop('password2'):
            raise serializers.ValidationError({'password': 'Passwords do not match.'})
        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password')
        member   = Member(**validated_data)
        member.set_password(password)
        member.save()
        return member


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Old password is incorrect.')
        return value
