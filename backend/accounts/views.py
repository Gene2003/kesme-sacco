"""accounts/views.py"""
from rest_framework import viewsets, generics, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Member
from .serializers import (
    MemberListSerializer,
    MemberDetailSerializer,
    MemberRegistrationSerializer,
    ChangePasswordSerializer,
)


class MemberViewSet(viewsets.ModelViewSet):
    """
    CRUD for members.
    - Unauthenticated POST creates a new member application (registration).
    - Authenticated GETs are restricted: staff see all, members see only themselves.
    """
    queryset = Member.objects.all().order_by('-registration_date')
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'member_type', 'gender']
    search_fields    = ['member_number', 'first_name', 'last_name', 'id_number', 'phone']
    ordering_fields  = ['registration_date', 'member_number', 'last_name']

    def get_serializer_class(self):
        if self.action == 'create':
            return MemberRegistrationSerializer
        if self.action == 'list':
            return MemberListSerializer
        return MemberDetailSerializer

    def get_permissions(self):
        if self.action == 'create':
            # Anyone can register
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Member.objects.all()
        # Regular members see only their own profile
        return Member.objects.filter(pk=user.pk)

    @action(detail=False, methods=['get', 'put', 'patch'], url_path='me')
    def me(self, request):
        """Return or update the currently authenticated member's profile."""
        member = request.user
        if request.method == 'GET':
            serializer = MemberDetailSerializer(member)
            return Response(serializer.data)

        serializer = MemberDetailSerializer(member, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    @action(detail=False, methods=['post'], url_path='change-password')
    def change_password(self, request):
        """Change the current user's password."""
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        return Response({'detail': 'Password changed successfully.'})

    @action(detail=True, methods=['patch'], url_path='activate',
            permission_classes=[permissions.IsAdminUser])
    def activate(self, request, pk=None):
        """Staff endpoint to activate a pending member."""
        member = self.get_object()
        member.status = Member.MemberStatus.ACTIVE
        member.save()
        return Response({'detail': f'{member.member_number} activated.'})

    @action(detail=True, methods=['patch'], url_path='suspend',
            permission_classes=[permissions.IsAdminUser])
    def suspend(self, request, pk=None):
        """Staff endpoint to suspend a member."""
        member = self.get_object()
        member.status = Member.MemberStatus.SUSPENDED
        member.save()
        return Response({'detail': f'{member.member_number} suspended.'})

    @action(detail=False, methods=['get'], url_path='dashboard',
            permission_classes=[permissions.IsAuthenticated])
    def dashboard(self, request):
        """Quick summary for the member portal dashboard."""
        member = request.user
        data = {
            'member_number':    member.member_number,
            'full_name':        member.get_full_name() or member.username,
            'status':           member.status,
            'share_capital':    str(member.share_capital),
            'total_savings':    str(member.total_savings),
            'active_loans':     member.active_loans_count,
        }
        return Response(data)
