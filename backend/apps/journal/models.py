from django.db import models
from django.contrib.auth import get_user_model
from .choices import VisiblityChoices, MoodChoices
from storage.models import UploadedFile

User = get_user_model()

class Tag(models.Model):
    name = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.name
    

class JournalEntry(models.Model):
    content = models.TextField()
    updated_at = models.DateField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255, blank=True, null=True)
    tags = models.ManyToManyField(Tag, blank=True, related_name='journal_entries')
    attachments = models.ForeignKey(UploadedFile, on_delete=models.CASCADE, blank=True, null=True)
    visiblity = models.CharField(max_length=10, choices=VisiblityChoices, default=VisiblityChoices.PRIVATE)
    mood = models.CharField(max_length=30, blank=True, null=True, choices=MoodChoices, default=MoodChoices.NEUTRAL)

    def __str__(self):
        return f"{self.title} created at {self.created_at} with {self.mood} mood."
