from rest_framework import generics, permissions
from .serializers import UploadedFileSerializer
from .models import UploadedFile
from .utils import upload_to_cloudinary


class UploadFileView(generics.CreateAPIView):
    serializer_class = UploadedFileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UploadedFile.objects.filter(user=self.request.user)
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'request': self.request})
        return context
    
    def perform_create(self, serializer):
        instance = serializer.save(user=self.request.user)
        cloud_url = upload_to_cloudinary(instance.file)
        instance.file_url = cloud_url
        instance.is_uploaded_to_cloud = True
        instance.save()

class UploadedFileDetailView(generics.RetrieveAPIView):
    serializer_class = UploadedFileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Secure: user can only access their own files
        return UploadedFile.objects.filter(user=self.request.user)