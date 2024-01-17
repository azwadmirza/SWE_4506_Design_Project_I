from django.urls import path
from . import views

urlpatterns = [

     path('classification/', views.knnClassification.as_view(), name='knn_model'),
     path('regression/', views.knnRegression.as_view(), name='knn_tree'),
]