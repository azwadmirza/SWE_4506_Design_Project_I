from django.urls import path
from . import views

urlpatterns = [
    path('constImputation/', views.constImputation, name='constImputation')
]