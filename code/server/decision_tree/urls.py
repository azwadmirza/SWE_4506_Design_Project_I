from django.urls import path
from . import views

urlpatterns = [
     path('start/', views.decision_tree_model.as_view(), name='decision_tree'),
]