from rest_framework import serializers
from .models import FileMetadata

class FileMetadataSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileMetadata
        fields = ('id', 'file', 'file_name', 'cloudinary_url', 'uploaded_at')