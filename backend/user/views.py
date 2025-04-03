from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from .serializers import RegistrationSerializer, UserSerializer, LoginSerializer
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile, UserSettings

# Getting the custom user model
User = get_user_model()

@api_view(["POST"])
def check_username_availablity(request):
    """
    Check if the username is available.
    """
    username = request.data.get('username')
    if User.objects.filter(username=username).exists():
        return Response({"message": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"message": "Username is available."}, status=status.HTTP_200_OK)


@api_view(["POST"])
def register(request):
    data = request.data
    serializer = RegistrationSerializer(data=data)
    if serializer.is_valid():
        user = serializer.save()
        
        # Create related UserProfile and UserSettings instances
        UserProfile.objects.create(user=user)
        UserSettings.objects.create(user=user)

        return Response({
            "user": UserSerializer(user).data,
            "message": "Registration Successful."
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    data = request.data
    # email = data.get('email')
    # username = data.get('username')
    # password = data.get('password')
    serializer = LoginSerializer(data=data)
    if serializer.is_valid():
        email = serializer.validated_data.get('email')
        password = serializer.validated_data.get('password')
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response("Invalid credentials.", status=status.HTTP_404_NOT_FOUND)
    except User.MultipleObjectsReturned:
        return Response("Multiple user with this email registered!", status=status.HTTP_406_NOT_ACCEPTABLE)
    
    if user.check_password(password):
        refresh_token = RefreshToken.for_user(user=user)
        access_token = refresh_token.access_token
        return Response({
            "refresh_token": str(refresh_token),
            "access_token": str(access_token),
            "message": "Login Successful."
        }, status=status.HTTP_200_OK)
        
    return Response("Invalid credentials.", status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_me(request):
    token = request.headers.get('Authorization').split(' ')[1]
    access_token = AccessToken(token) # Decode the token

    # Get the user ID from the token payload
    user_id = access_token['user_id']
    try:
        user = User.objects.prefetch_related('profile').prefetch_related('settings').get(id=user_id)
        serializers = UserSerializer(user)
        # if serializers.is_valid():
        print(serializers.data)
            # return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(serializers.data, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response("User not found.", status=status.HTTP_404_NOT_FOUND)
    except User.MultipleObjectsReturned:
        return Response("multiple user with this email registered!", status=status.HTTP_406_NOT_ACCEPTABLE)