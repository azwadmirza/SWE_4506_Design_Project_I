from django.urls import path
from . import views

urlpatterns = [
     path('start/', views.knn_model.as_view(), name='knn_model'),
]