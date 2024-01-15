from django.urls import path
from . import views

urlpatterns = [
     path('classification/', views.svmClassification.as_view(), name='svm'),
     path('regression/', views.svmRegression.as_view(), name='svm'),
]