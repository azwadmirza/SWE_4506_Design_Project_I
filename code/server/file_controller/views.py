from cloudinary.uploader import upload
from rest_framework import generics
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework import status
from .models import FileMetadata
from .serializers import FileMetadataSerializer
from django.http import FileResponse
from django.shortcuts import get_object_or_404
from .models import FileMetadata
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

class FileUploadView(generics.CreateAPIView):
    permission_classes=[]
    queryset = FileMetadata.objects.all()  # Provide a queryset
    serializer_class = FileMetadataSerializer
    parser_classes = (FileUploadParser,)
    print("Ami Pagla -1")

    def post(self, request, *args, **kwargs):
        file_serializer = FileMetadataSerializer(data=request.data)
        print("Ami Pagla 0")

        if file_serializer.is_valid():
            try:
                # Upload the file to Cloudinary
                print("Ami Pagla 1")
                uploaded_file = upload(request.data['file'])

                # Get the Cloudinary URL
                file_url = uploaded_file['url']

                # Save the file metadata
                print("Ami Pagla 2")
                file_serializer.save(file_url=file_url, file_name=request.data['file'].name)
                print("Ami Pagla 3")

                # Return a success response with the Cloudinary URL
                return Response({'file_url': file_url}, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({'error': 'File upload to Cloudinary failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class FileDownloadView(generics.RetrieveAPIView):
    queryset = FileMetadata.objects.all()
    serializer_class = FileMetadataSerializer

    def retrieve(self, request, pk):
        file_metadata = get_object_or_404(FileMetadata, pk=pk)
        return Response({'file_url': file_metadata.cloudinary_url}, status=status.HTTP_200_OK)
    

