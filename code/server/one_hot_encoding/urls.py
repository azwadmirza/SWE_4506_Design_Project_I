from django.urls import path
from . import views

urlpatterns = [
    path('one_hot_encoding/', views.OneHotEncoding, name='OneHotEncoding')
]