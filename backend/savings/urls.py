"""savings/urls.py"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SavingsAccountViewSet, SavingsTransactionViewSet, FixedDepositViewSet

router = DefaultRouter()
router.register(r'accounts',     SavingsAccountViewSet,     basename='savings-account')
router.register(r'transactions', SavingsTransactionViewSet, basename='savings-transaction')
router.register(r'fixed',        FixedDepositViewSet,        basename='fixed-deposit')

urlpatterns = [path('', include(router.urls))]
