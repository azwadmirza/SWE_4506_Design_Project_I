from django.db import models


class FileMetadata(models.Model):
    # file = models.FileField(upload_to='uploads/')  # Your file upload field
    file_name = models.CharField(max_length=255)
    cloudinary_url = models.URLField()
    uploaded_at = models.DateTimeField(auto_now_add=True)