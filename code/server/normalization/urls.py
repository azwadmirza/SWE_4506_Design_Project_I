from django.urls import path
from .views import MinMaxNorm


urlpatterns = [
    path('min-max/', MinMaxNorm.as_view(), name='MinMaxNorm')
]