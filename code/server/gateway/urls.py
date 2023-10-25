from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path('register/', views.RegistrationView.as_view(), name='user-registration'),
    path('login/', views.GetToken.as_view(), name='user-registration'),
    path('refresh-token/', TokenRefreshView.as_view(), name='token_refresh'),
    path('verify-token/', TokenVerifyView.as_view(), name='token_verify'),
    path('otp/<int:id>/',views.VerifyEmail.as_view(),name='otp-send'),
    path('otp/verify/',views.VerifyEmail.as_view(),name='otp-verification'),
    path('forgot/otp/',views.ForgotPassword.as_view(),name='otp-verification-forgot'),
    path('forgot/otp/verify/',views.ForgotPasswordVerify.as_view(),name='otp-verification-forgot-verify'),
    path('forgot/update/',views.ForgotPasswordUpdate.as_view(),name='otp-verification-forgot-update'),
    path('change/',views.ChangePassword.as_view(),name='change-update'),
]