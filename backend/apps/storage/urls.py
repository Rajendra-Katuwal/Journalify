from django.urls import path
from .views import UploadFileView, UploadedFileListView, UploadedFileDetailView

urlpatterns = [
    path('upload/', UploadFileView.as_view(), name='upload-file'),
    path('files/', UploadedFileListView.as_view(), name='uploaded-file-list'),
    path('files/<int:pk>/', UploadedFileDetailView.as_view(), name='uploaded-file-detail'),
]
