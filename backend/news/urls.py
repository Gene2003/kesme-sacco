"""news/urls.py"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NewsCategoryViewSet, NewsArticleViewSet

router = DefaultRouter()
router.register(r'categories', NewsCategoryViewSet, basename='news-category')
router.register(r'articles',   NewsArticleViewSet,  basename='news-article')

urlpatterns = [path('', include(router.urls))]
