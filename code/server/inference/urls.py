from django.urls import path
from . import views

urlpatterns = [
     path('find/', views.best_model_performance.as_view(), name='inference'),
]