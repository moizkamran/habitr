from django.shortcuts import render
from rest_framework import generics
from .models import Habit
from .serializers import HabitSerializer

# Create your views here.

class HabitView(generics.ListCreateAPIView):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer
