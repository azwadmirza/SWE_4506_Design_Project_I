from django.urls import path
from .views import FileUploadView,FileSaveView,FileDownloadView,GetAllFiles,GetStatisticalInformation,GetDataInfo

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('save/', FileSaveView.as_view(), name='file-save'),
    path('download/<int:pk>/', FileDownloadView.as_view(), name='file-download'),
    path('getall/<int:id>/', GetAllFiles.as_view(), name='get-all-files'),
    path('get-stat/',GetStatisticalInformation.as_view(),name='get-stat'),
    path('get-data/',GetDataInfo.as_view(),name='get-stat')
]
