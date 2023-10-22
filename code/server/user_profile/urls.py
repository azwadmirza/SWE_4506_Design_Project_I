from django.urls import path
from .views import Profile

urlpatterns = [
    path('get-profile/<int:id>/', Profile.as_view(), name='profile', kwargs={'http_method_names': ['get']}),
]