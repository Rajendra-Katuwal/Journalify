from celery import shared_task
import cloudinary.uploader
import os
import mimetypes
from .models import UploadedFile
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist

@shared_task(bind=True, max_retries=3, default_retry_delay=10)
def upload_file_to_cloudinary(self, uploaded_file_id):
    try:
        file_instance = UploadedFile.objects.get(id=uploaded_file_id)
        file_path = file_instance.file.path
        content_type, _ = mimetypes.guess_type(file_instance.file.name)

        print("Content Type of the file is :" + content_type)

        if content_type and content_type.startswith("image"):
            resource_type = "image"
        elif content_type and content_type.startswith("video"):
            resource_type = "video"
        else:
            resource_type = "raw"

        result = cloudinary.uploader.upload(
            file_path,
            folder="journalify",
            resource_type="auto"
        )

        file_instance.file_url = result.get("secure_url")
        file_instance.is_uploaded_to_cloud = True
        file_instance.save()

        # Delete local file
        if os.path.exists(file_path):
            os.remove(file_path)

        return f"Uploaded and cleaned file {file_instance.id}"

    except ObjectDoesNotExist:
        return f"File with ID {uploaded_file_id} does not exist."

    except Exception as e:
        self.retry(exc=e)  # Retry failed uploads
