from django.urls import path
from . import views

urlpatterns = [
     path('start/', views.linear_regression_model.as_view(), name='linear_regression'),
]