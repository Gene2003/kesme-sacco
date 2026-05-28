"""contact/urls.py"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactInquiryViewSet, WaitlistEntryViewSet

router = DefaultRouter()
router.register(r'inquiries', ContactInquiryViewSet, basename='contact-inquiry')
router.register(r'waitlist',  WaitlistEntryViewSet,  basename='waitlist-entry')

urlpatterns = [path('', include(router.urls))]
