from django.urls import path
from .views import FileUploadView, FileDownloadView

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('download/<int:pk>/', FileDownloadView.as_view(), name='file-download'),
    
]
