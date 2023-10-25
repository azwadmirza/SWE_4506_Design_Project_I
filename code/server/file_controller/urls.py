from django.urls import path
from .views import FileUploadView, FileDownloadView,GetAllFiles

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('download/<int:pk>/', FileDownloadView.as_view(), name='file-download'),
    path('getall/<int:id>/', GetAllFiles.as_view(), name='get-all-files'),
    
]
