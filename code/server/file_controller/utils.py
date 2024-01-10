import cloudinary
import cloudinary.uploader
import io

def upload_to_cloudinary(file, user_id):
    try:
        file_content = io.BytesIO(file.read())
        file_name = file.name

        public_id = f"{user_id}_{file_name}"
        upload_result = cloudinary.uploader.upload(
            file_content, 
            resource_type="auto", 
            public_id=public_id
        )

        return upload_result['secure_url']
    except Exception as e:
        print(f"Cloudinary upload failed: {str(e)}")
        return None
