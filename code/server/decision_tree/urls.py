from django.urls import path
from . import views

urlpatterns = [
     path('classification/', views.decisionTreeClassification.as_view(), name='decision_tree'),
     path('regression/', views.decisionTreeRegression.as_view(), name='decision_tree'),
]