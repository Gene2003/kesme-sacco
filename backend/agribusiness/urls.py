"""agribusiness/urls.py"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ValueChainViewSet, AgribusinessApplicationViewSet, FarmerTrainingViewSet

router = DefaultRouter()
router.register(r'value-chains',   ValueChainViewSet,              basename='value-chain')
router.register(r'applications',   AgribusinessApplicationViewSet, basename='agri-application')
router.register(r'trainings',      FarmerTrainingViewSet,          basename='farmer-training')

urlpatterns = [path('', include(router.urls))]
