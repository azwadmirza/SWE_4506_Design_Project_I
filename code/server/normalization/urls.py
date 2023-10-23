from django.urls import path
from . import views

urlpatterns = [
    path('min-max/', views.MinMaxNorm, name='MinMaxNorm')
]