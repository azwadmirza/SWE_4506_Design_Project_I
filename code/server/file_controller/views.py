from rest_framework import generics
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from .models import FileMetadata
from .serializers import FileMetadataSerializer
from django.http import FileResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

class FileUploadView(generics.CreateAPIView):
    permission_classes=[]
    queryset = FileMetadata.objects.all()  # Provide a queryset
    serializer_class = FileMetadataSerializer
    def post(self, request, format=None):
        file_serializer = FileMetadataSerializer(data=request.data)
        

        if file_serializer.is_valid():
            try:
                # Get the file name from the request data
                file_name= request.data.get("file_name")  # Access the file name

                cloudinary_url = request.data.get("cloudinary_url")

                file_serializer.save(file_name=file_name, cloudinary_url=cloudinary_url)

                return Response({'file_url': cloudinary_url}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': 'File upload to Mongo failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class FileDownloadView(generics.RetrieveAPIView):
    queryset = FileMetadata.objects.all()
    serializer_class = FileMetadataSerializer

    def retrieve(self, request, pk):
        file_metadata = get_object_or_404(FileMetadata, pk=pk)
        return Response({'file_url': file_metadata.cloudinary_url}, status=status.HTTP_200_OK)
    

