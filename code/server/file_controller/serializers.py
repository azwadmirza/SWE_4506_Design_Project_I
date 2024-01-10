from rest_framework import serializers
from .models import FileMetadata

class FileMetadataSerializer(serializers.ModelSerializer):
    edited_file = serializers.URLField(required=False)
    cloudinary_url = serializers.URLField(required=False)
    file_name = serializers.CharField(max_length=255, required=False)
    class Meta:
        model = FileMetadata
        fields = ('id', 'file_name', 'cloudinary_url', 'uploaded_at', 'modified_file', 'operations', 'user_id', 'edited_file')
        
        