"""news/views.py"""
from rest_framework import viewsets, permissions
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

from .models import NewsCategory, NewsArticle
from .serializers import (
    NewsCategorySerializer,
    NewsArticleListSerializer,
    NewsArticleDetailSerializer,
)


class NewsCategoryViewSet(viewsets.ModelViewSet):
    queryset = NewsCategory.objects.all()
    serializer_class = NewsCategorySerializer
    filter_backends  = [SearchFilter]
    search_fields    = ['name']

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]


class NewsArticleViewSet(viewsets.ModelViewSet):
    filter_backends  = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'category']
    search_fields    = ['title', 'excerpt', 'content']
    ordering_fields  = ['published_at', 'created_at']

    def get_queryset(self):
        user = self.request.user
        # Non-staff (and unauthenticated) see only published articles
        if not (user.is_authenticated and user.is_staff):
            return NewsArticle.objects.filter(status=NewsArticle.Status.PUBLISHED)
        return NewsArticle.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return NewsArticleListSerializer
        return NewsArticleDetailSerializer

    def get_permissions(self):
        if self.action in ('list', 'retrieve'):
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_object(self):
        # Allow lookup by slug as well as pk
        lookup = self.kwargs.get(self.lookup_field)
        queryset = self.get_queryset()
        if not lookup.isdigit():
            return queryset.get(slug=lookup)
        return queryset.get(pk=lookup)
