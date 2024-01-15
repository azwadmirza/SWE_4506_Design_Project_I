from django.urls import path
from . import views

urlpatterns = [
     path('start/', views.knn_model.as_view(), name='knn_model'),
     path('start-regressor/', views.knn_regressor.as_view(), name='knn_regressor'),
]