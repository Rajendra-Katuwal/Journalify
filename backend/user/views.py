from django.shortcuts import render
from rest_framework.decorators import api_view
from .serializers import RegistrationSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

@api_view(["POST"])
def register(request):
    data = request.data
    serializer = RegistrationSerializer(data=data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            "user": UserSerializer(user).data,
            "message": "Registration Sucessfull."
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"message": "Invalid credentials."}, status=status.HTTP_404_NOT_FOUND)
    
    if user.check_password(password):
        refresh_token = RefreshToken.for_user(user=user)
        access_token = refresh_token.access_token
        return Response({
            "refresh_token": str(refresh_token),
            "access_token": str(access_token),
            "message": "Login Successful."
        }, status=status.HTTP_200_OK)
        
    return Response({"message": "Invalid credentials."}, status=status.HTTP_404_NOT_FOUND)