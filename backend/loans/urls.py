"""loans/urls.py"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LoanProductViewSet,
    LoanApplicationViewSet,
    LoanViewSet,
    LoanRepaymentViewSet,
    LoanCalculatorView,
)

router = DefaultRouter()
router.register(r'products',     LoanProductViewSet,     basename='loan-product')
router.register(r'applications', LoanApplicationViewSet, basename='loan-application')
router.register(r'active',       LoanViewSet,            basename='loan')
router.register(r'repayments',   LoanRepaymentViewSet,   basename='loan-repayment')

urlpatterns = [
    path('', include(router.urls)),
    path('calculate/', LoanCalculatorView.as_view(), name='loan-calculator'),
]
