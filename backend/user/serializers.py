from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db import models
from .models import UserProfile, UserSettings


# Getting the custom user model
User = get_user_model()


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    
    def create(self, validated_data):
        user = User(
            username = validated_data['username'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password']

    # def validate(self, attrs):
    #     email = attrs.get('email')
    #     password = attrs.get('password')

    #     if not User.objects.filter(email=email).exists():
    #         raise serializers.ValidationError("User with this email does not exist.")

    #     user = User.objects.get(email=email)

    #     if not user.check_password(password):
    #         raise serializers.ValidationError("Incorrect password.")

    #     return attrs


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"


class UserSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    settings = UserSettingSerializer(read_only=True)
    class Meta:
        model=User
        # fields = ['id', 'email', 'username', 'first_name', 'last_name', 'date_joined', 'last_login', 'bio']
        fields = ['id', 'email', 'username', 'date_joined', 'last_login', 'profile', 'settings']