from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class UploadedFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_files')
    file = models.FileField(upload_to='uploads/temp/')  # Local temporary upload
    file_url = models.URLField(blank=True,  null=True)
    file_type = models.CharField(max_length=50, blank=True)
    is_uploaded_to_cloud = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.file.name} by {self.user.username}"
