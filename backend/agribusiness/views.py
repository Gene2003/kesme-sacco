"""agribusiness/views.py"""
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.utils import timezone

from .models import ValueChain, AgribusinessApplication, FarmerTraining
from .serializers import (
    ValueChainSerializer,
    AgribusinessApplicationSerializer,
    FarmerTrainingSerializer,
)


class ValueChainViewSet(viewsets.ModelViewSet):
    queryset = ValueChain.objects.filter(is_active=True)
    serializer_class = ValueChainSerializer
    filter_backends  = [SearchFilter]
    search_fields    = ['name', 'description']

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class AgribusinessApplicationViewSet(viewsets.ModelViewSet):
    queryset = AgribusinessApplication.objects.select_related('member', 'value_chain').all()
    serializer_class = AgribusinessApplicationSerializer
    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'value_chain', 'financing_type', 'member']
    search_fields    = ['member__member_number', 'member__first_name', 'season']
    ordering_fields  = ['applied_at', 'amount_requested']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return AgribusinessApplication.objects.select_related('member', 'value_chain').all()
        return AgribusinessApplication.objects.filter(member=user)

    def perform_create(self, serializer):
        serializer.save(member=self.request.user)

    @action(detail=True, methods=['patch'], url_path='approve',
            permission_classes=[permissions.IsAdminUser])
    def approve(self, request, pk=None):
        app = self.get_object()
        if app.status != AgribusinessApplication.Status.PENDING:
            return Response(
                {'detail': 'Only pending applications can be approved.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        app.status      = AgribusinessApplication.Status.APPROVED
        app.reviewed_at = timezone.now()
        app.reviewed_by = request.user
        app.staff_notes = request.data.get('notes', '')
        app.save()
        return Response({'detail': 'Application approved.'})

    @action(detail=True, methods=['patch'], url_path='reject',
            permission_classes=[permissions.IsAdminUser])
    def reject(self, request, pk=None):
        app = self.get_object()
        reason = request.data.get('rejection_reason', '')
        if not reason:
            return Response(
                {'detail': 'rejection_reason is required.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        app.status           = AgribusinessApplication.Status.REJECTED
        app.rejection_reason = reason
        app.reviewed_at      = timezone.now()
        app.reviewed_by      = request.user
        app.save()
        return Response({'detail': 'Application rejected.'})


class FarmerTrainingViewSet(viewsets.ModelViewSet):
    queryset = FarmerTraining.objects.prefetch_related('attendees').all()
    serializer_class = FarmerTrainingSerializer
    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['training_type', 'value_chain', 'is_completed']
    search_fields    = ['title', 'venue', 'facilitator']
    ordering_fields  = ['scheduled_date']

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]

    @action(detail=True, methods=['post'], url_path='register',
            permission_classes=[permissions.IsAuthenticated])
    def register(self, request, pk=None):
        """Member self-registers for a training session."""
        training = self.get_object()
        training.attendees.add(request.user)
        return Response({'detail': f'Registered for {training.title}.'})

    @action(detail=True, methods=['post'], url_path='complete',
            permission_classes=[permissions.IsAdminUser])
    def complete(self, request, pk=None):
        training = self.get_object()
        training.is_completed = True
        training.notes = request.data.get('notes', training.notes)
        training.save()
        return Response({'detail': 'Training marked as completed.'})
