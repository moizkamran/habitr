from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Habit
from .serializers import HabitSerializer, CreateHabitSerializer, UpdateHabitSerializer, DeleteHabitSerializer, HabitCompletionSerializer
from rest_framework.views import APIView

# Create your views here.

class HabitView(generics.ListCreateAPIView):
    queryset = Habit.objects.prefetch_related('completions')  # Prefetch related completions
    serializer_class = HabitSerializer


class CreateHabitView(APIView):
    serializer_class = CreateHabitSerializer

    def post(self, request, format=None):
        serializer = CreateHabitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteHabitView(APIView):
    serializer_class = DeleteHabitSerializer

    def delete(self, request, pk, format=None):
        habit = Habit.objects.get(pk=pk)
        habit.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UpdateHabitView(APIView):
    serializer_class = UpdateHabitSerializer

    def put(self, request, pk, format=None):
        habit = Habit.objects.get(pk=pk)
        serializer = UpdateHabitSerializer(habit, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class HabitCompletionView(generics.CreateAPIView):
    serializer_class = HabitCompletionSerializer

    def post(self, request, *args, **kwargs):
        habit_id = request.data.get('habit')  # Assuming 'habit' is the habit ID
        if habit_id is None:
            return Response({"habit": ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Set the habit_id before saving the serializer
            serializer.validated_data['habit_id'] = habit_id
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)