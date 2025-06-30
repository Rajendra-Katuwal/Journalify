from rest_framework import serializers
from .models import UploadedFile


MAX_FILE_SIZE_MB = 10
ALLOWED_CONTENT_TYPES = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'text/plain',
]

class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = [
            'id',
            'user',
            'file',
            'file_url',
            'file_type',
            'is_uploaded_to_cloud',
            'uploaded_at'
        ]
        read_only_fields = [
            'id',
            'user',
            'file_url',
            'file_type',
            'is_uploaded_to_cloud',
            'uploaded_at'
        ]
        
        def validate_file(self, value):
            # File size check
            max_bytes = MAX_FILE_SIZE_MB * 1024 * 1024
            if value.size > max_bytes:
                raise serializers.ValidationError(f"File size exceeds {MAX_FILE_SIZE_MB}MB limit.")

            # Content type check
            if value.content_type not in ALLOWED_CONTENT_TYPES:
                raise serializers.ValidationError("Unsupported file type.")

            return value
        
        def create(self, validated_data):
            request = self.context.get('request')
            file = validated_data.get('file')
            validated_data['user'] = request.user
            validated_data['file_type'] = file.content_type
            return super().create(validated_data)



