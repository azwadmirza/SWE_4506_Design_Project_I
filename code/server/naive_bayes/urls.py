from django.urls import path
from . import views

urlpatterns = [
     path('start/', views.naive_bayes_model.as_view(), name='naive_bayes'),
]