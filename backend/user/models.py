from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

class JournalifyUserManager(UserManager):
    """
    Custom manager for the JournalifyUser model that returns the users that are currently active.
    """
    
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)


class JournalifyUser(AbstractUser):
    """
    Custom user model that extends the default AbstractUser.
    """
    # Required Fields
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)

    # These fields are automatically set by Django.
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    # This is useful for soft deletion or deactivation of users.
    # This field is used to indicate if the user is active or not.
    is_active = models.BooleanField(default=True)

    
    # Custom managers
    objects = models.Manager()  # The default manager.
    active_users = JournalifyUserManager()  # Custom manager for active users.

    def __str__(self):
        return self.username
    

class UserProfile(models.Model):
    """
    User profile model that extends the JournalifyUser model.
    """
    user = models.OneToOneField(JournalifyUser, on_delete=models.CASCADE, related_name='profile' ,)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    bio = models.TextField(blank=True, null=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

    
class UserSettings(models.Model):
    """
    User settings model that extends the JournalifyUser model.
    """
    user = models.OneToOneField(JournalifyUser, on_delete=models.CASCADE, related_name='settings')
    theme = models.CharField(max_length=20, default='light')
    language = models.CharField(max_length=20, default='en')

    def __str__(self):
        return f"{self.user.username}'s Settings"
    
