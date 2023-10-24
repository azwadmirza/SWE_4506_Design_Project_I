from rest_framework import serializers
from .models import FileMetadata

class FileMetadataSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileMetadata
        fields = ('id', 'file_name', 'cloudinary_url', 'uploaded_at', 'modified_file', 'operations')

    file_name = serializers.CharField(max_length=255, required=False)
    cloudinary_url = serializers.URLField(max_length=2000, required=False)
    modified_file = serializers.JSONField(required=False)
    operations = serializers.JSONField(required=False)
