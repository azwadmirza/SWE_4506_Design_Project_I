from rest_framework import generics
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status
import pandas as pd
import numpy as np
from .models import FileMetadata
from .serializers import FileMetadataSerializer
from django.http import FileResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import authentication_classes
import pandas as pd
import json
from .utils import upload_to_cloudinary, save_to_cloudinary
from django.http import JsonResponse



@authentication_classes([JWTAuthentication])
class FileUploadView(APIView):
    permission_classes = []  
    queryset = FileMetadata.objects.all() 
    serializer_class = FileMetadataSerializer
    def post(self, request, format=None):
        try:
            file = request.data.get("file")
            file_name = file.name
            user_id = request.data.get("user_id")
            cloudinary_url = upload_to_cloudinary(file, user_id)

            # file_content = request.data.get("parsedCSV")
            # csv_data = json.loads(file_content)
            # file_df = pd.DataFrame(csv_data[1:], columns=csv_data[0])
            # final_json = file_df.to_json(orient='records')
            
            file_metadata = FileMetadata.objects.create(
                file_name=file_name,
                cloudinary_url=cloudinary_url,
                edited_file=cloudinary_url,
                # modified_file=final_json,
                user_id=user_id
            )
            print(file_metadata.id)

            return Response({'file_url': cloudinary_url, 'file_id': file_metadata.id, 'file_name': file_metadata.file_name}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': 'File upload failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
@authentication_classes([JWTAuthentication])
class FileSaveView(APIView):
    permission_classes = []
    queryset = FileMetadata.objects.all()
    serializer_class = FileMetadataSerializer

    def post(self, request, format=None):
        try:
            file_content = request.data.get("file_content")
            file_name = request.data.get("file_name")
            file_id = request.data.get("file_id")
            user_id = request.data.get("user_id")
            print(file_content)
            print(file_name)
            print(file_id)
            print(user_id)

            print("File Name: " + file_name)
            print("User ID:" + user_id)
            print("File Content: " + file_content)
            print("File Id: "+ file_id)
            edited_cloudinary_url = save_to_cloudinary(file_content, file_name, user_id)
            print(edited_cloudinary_url)
            print("Entering the Block")
            try:
                file_metadata, _ = FileMetadata.objects.update_or_create(
                user_id=user_id,
                id=file_id,
                defaults={'edited_file': edited_cloudinary_url}
                )
                print(file_metadata)
                file_metadata.save()
                print(file_metadata.cloudinary_url)
                print(file_metadata.edited_file)
                print(edited_cloudinary_url)
                
                return Response({'file_url': edited_cloudinary_url}, status=status.HTTP_201_CREATED)

            except FileMetadata.DoesNotExist:
                print("FileMetadata not found")
                
        except Exception as e:
            print(e)
            return Response({'error': 'File upload failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@authentication_classes([JWTAuthentication])
class GetStatisticalInformation(APIView):
    permission_classes=[]
    queryset = FileMetadata.objects.all()
    serializer_class = FileMetadataSerializer
    def post(self,request,*args,**kwargs):
        try:
            url=request.data.get("url")
            filetype=request.data.get("filetype")
            delimiter=request.data.get("delimiter")
            print(url,filetype,delimiter)
            df=None
            if filetype=="csv" or url.endswith(".csv"):
                df=pd.read_csv(url)
            elif filetype=="json" or url.endswith(".json"):
                df=pd.read_json(url)
            elif filetype=="excel" or url.endswith(".xlsx"):
                df=pd.read_excel(url)
            elif filetype=="txt" and delimiter or url.endswith(".txt") and delimiter:
                df=pd.read_csv(url,delimiter=delimiter)
            else:
                df=pd.read_csv(url)
            df=df.describe()
            df=df.to_json()
            return Response(df,status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'error': 'File Server Error Could Not Retrieve File'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
        
@authentication_classes([JWTAuthentication])
class GetAllFiles(APIView):
    permission_classes=[]
    queryset = FileMetadata.objects.all()
    serializer_class = FileMetadataSerializer
    def get(self,request,*args,**kwargs):
        try:
            id = kwargs.get('id')
            files = FileMetadata.objects.filter(user_id=id)
            serializer = FileMetadataSerializer(files, many=True)
            print(serializer.data)
            response = JsonResponse(serializer.data, safe=False)
            return response
        except Exception as e:
            print(e)
            return Response({'error': 'File Server Error Could Not Retrieve File'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@authentication_classes([JWTAuthentication])
class FileDownloadView(generics.RetrieveAPIView):
    queryset = FileMetadata.objects.all()
    serializer_class = FileMetadataSerializer

    def retrieve(self, request, pk):
        file_metadata = get_object_or_404(FileMetadata, pk=pk)
        return Response({'file_url': file_metadata.edited_file , 'file_id': file_metadata.id, 'file_name': file_metadata.file_name}, status=status.HTTP_200_OK)
    

