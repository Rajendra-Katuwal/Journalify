# apps/authentication/urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    UserRegistrationView, 
    UserProfileView, 
    PasswordResetRequestView, 
    PasswordResetConfirmView,
    EmailVerificationView,
    UpdatePasswordView,
    UserLoginView,
    LogoutView
)

urlpatterns = [
    # Authentication Endpoints
    path('login/', UserLoginView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistrationView.as_view(), name='user_registration'),
    path('verify-email/', EmailVerificationView.as_view(), name='email_verification'),
    path('logout/', LogoutView.as_view(), name='user_logout'),
    
    # Password Management
    path('forgot-password/', PasswordResetRequestView.as_view(), name='password_reset_request'),
    path('reset-password/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    
    # Profile Management
    path('me/', UserProfileView.as_view(), name='user_profile'),
    path('password/update/', UpdatePasswordView.as_view(), name='update_password'),
]