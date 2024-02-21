from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Habit
from .serializers import HabitSerializer, CreateHabitSerializer, UpdateHabitSerializer
from rest_framework.views import APIView

# Create your views here.

class HabitView(generics.ListCreateAPIView):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer

class CreateHabitView(APIView):
    serializer_class = CreateHabitSerializer

    def post(self, request, format=None):
        serializer = CreateHabitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UpdateHabitView(APIView):
    serializer_class = UpdateHabitSerializer

    def put(self, request, pk, format=None):
        habit = Habit.objects.get(pk=pk)
        serializer = UpdateHabitSerializer(habit, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)