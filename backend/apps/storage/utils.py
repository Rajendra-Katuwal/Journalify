import mimetypes
import cloudinary

def upload_to_cloudinary(file_obj, folder="journalify"):
    content_type, _ = mimetypes.guess_type(file_obj.name)
    
    if content_type and content_type.startswith("image"):
        resource_type = "image"
    elif content_type and content_type.startswith("video"):
        resource_type = "video"
    else:
        resource_type = "raw"

    result = cloudinary.uploader.upload(
        file_obj,
        folder=folder,
        resource_type=resource_type
    )
    return result.get("secure_url")
