"""contact/views.py"""
from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.utils import timezone

from .models import ContactInquiry
from .serializers import ContactInquirySerializer, ContactInquiryAdminSerializer


class ContactInquiryViewSet(viewsets.ModelViewSet):
    queryset = ContactInquiry.objects.all()
    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'subject']
    search_fields    = ['first_name', 'last_name', 'email', 'phone']
    ordering_fields  = ['created_at']

    def get_serializer_class(self):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return ContactInquiryAdminSerializer
        return ContactInquirySerializer

    def get_permissions(self):
        # Anyone can POST (submit inquiry); only staff can GET list / detail
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    @action(detail=True, methods=['patch'], url_path='resolve',
            permission_classes=[permissions.IsAdminUser])
    def resolve(self, request, pk=None):
        inquiry = self.get_object()
        inquiry.status      = ContactInquiry.Status.RESOLVED
        inquiry.resolved_at = timezone.now()
        inquiry.notes       = request.data.get('notes', inquiry.notes)
        inquiry.save()
        return Response({'detail': 'Inquiry marked as resolved.'})

    @action(detail=True, methods=['patch'], url_path='in-progress',
            permission_classes=[permissions.IsAdminUser])
    def in_progress(self, request, pk=None):
        inquiry = self.get_object()
        inquiry.status = ContactInquiry.Status.IN_PROGRESS
        inquiry.notes  = request.data.get('notes', inquiry.notes)
        inquiry.save()
        return Response({'detail': 'Inquiry marked as in progress.'})
