from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your views here.
@api_view(['POST'])
def signup(request):
    data = request.data
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return Response({"error": "Name, email, and password are required."}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=email).exists():
        return Response({"error": "User with this email already exists."}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(email=email, name=name, password=password)
    return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)