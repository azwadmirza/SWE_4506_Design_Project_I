from django.urls import path
from . import views

urlpatterns = [
     path('classification/', views.xgboost_classification_model.as_view(), name='xgboost'),
     path('regression/', views.xgboost_regression_model.as_view(), name='xgboost'),
]