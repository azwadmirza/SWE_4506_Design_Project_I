from django.urls import path
from . import views

urlpatterns = [
     path('start/', views.logistic_regression_model.as_view(), name='logistic_regression'),
]