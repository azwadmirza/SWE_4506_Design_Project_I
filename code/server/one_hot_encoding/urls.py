from django.urls import path
from .views import OneHotEncoding

urlpatterns = [
    path('one_hot_encoding/', OneHotEncoding.as_view(), name='OneHotEncoding')
]