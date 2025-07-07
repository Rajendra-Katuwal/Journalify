from django.db import models

# Choice for the moods column in the journal entry
class MoodChoices(models.TextChoices):
    EXCITED = 'excited', 'Excited'
    HAPPY = 'happy', 'Happy'
    RELAXED = 'relaxed', 'Relaxed'
    NEUTRAL = 'neutral', 'Neutral'
    SAD = 'sad', 'Sad'
    ANGRY = 'angry', 'Angry'
    ANXIOUS = 'anxious', 'Anxious'

# Choices for the visiblity option in the journal entry
class VisiblityChoices(models.TextChoices):
    PUBLIC = 'public', 'Public'
    PRIVATE = 'private', 'Private'