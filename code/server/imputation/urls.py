from django.urls import path
from .views import Imputation

urlpatterns = [
    path('imputation/', Imputation.as_view(), name='Imputation')
]