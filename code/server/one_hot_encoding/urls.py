from django.urls import path
from . import views

urlpatterns = [
    path('encoding/', views.OneHotEncoding, name='OneHotEncoding')
]