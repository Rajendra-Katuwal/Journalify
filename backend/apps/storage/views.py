from rest_framework import generics, permissions
from .serializers import UploadedFileSerializer
from .models import UploadedFile
from .tasks import upload_file_to_cloudinary


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
        upload_file_to_cloudinary.delay(instance.id)

class UploadedFileListView(generics.ListAPIView):
    serializer_class = UploadedFileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Return files only uploaded by current user
        return UploadedFile.objects.filter(user=self.request.user).order_by('-uploaded_at')
    
class UploadedFileDetailView(generics.RetrieveAPIView):
    serializer_class = UploadedFileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Secure: user can only access their own files
        return UploadedFile.objects.filter(user=self.request.user)