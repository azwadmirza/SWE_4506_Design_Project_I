from django.urls import path
from . import views

urlpatterns = [
     path('start/', views.xgboost_model.as_view(), name='xgboost'),
]