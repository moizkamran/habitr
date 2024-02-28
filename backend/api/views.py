from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta
from django.db.models import Count, F, ExpressionWrapper, DecimalField
from django.db.models.functions import Coalesce, ExtractDay
from .models import Habit, HabitCompletion
from .serializers import HabitSerializer, CreateHabitSerializer, UpdateHabitSerializer, DeleteHabitSerializer, HabitCompletionSerializer, UpdateHabitStreakSerializer, UpdateHabitCompletionSerializer
from rest_framework.views import APIView

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
    
class UpdateHabitStreakView(APIView):
    serializer_class = UpdateHabitStreakSerializer

    def put(self, request, pk, format=None):
        habit = Habit.objects.get(pk=pk)
        serializer = UpdateHabitStreakSerializer(habit, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UpdateHabitCompletionView(APIView):
    serializer_class = UpdateHabitCompletionSerializer

    def put(self, request, pk, format=None):
        habit = Habit.objects.get(pk=pk)
        serializer = UpdateHabitCompletionSerializer(habit, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class HabitCompletionView(generics.CreateAPIView):
    serializer_class = HabitCompletionSerializer

    def post(self, request, *args, **kwargs):
        habit_id = request.data.get('habit') 
        completion_date = request.data.get('completion_date')

        if habit_id is None:
            return Response({"habit": ["This field is required."]}, status=status.HTTP_400_BAD_REQUEST)

        # Check if completion date already exists for the habit
        # Better safe than sorry
        if HabitCompletion.objects.filter(habit_id=habit_id, completion_date=completion_date).exists():
            return Response({"detail": "Completion date already exists for this habit."},
                            status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['habit_id'] = habit_id
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class HighestStreakHabitView(APIView):
    def get(self, request, format=None):
        # Query for the habit with the highest streak
        try:
            highest_streak_habit = Habit.objects.latest('streak')
            serializer = HabitSerializer(highest_streak_habit)
            return Response(serializer.data)
        except Habit.DoesNotExist:
            return Response({"detail": "No habits found."}, status=status.HTTP_404_NOT_FOUND)
        
class StruggledHabitByMonthView(APIView):
    def get(self, request, month, year, format=None):
        # Validate input month and year
        try:
            month = int(month)
            year = int(year)
        except ValueError:
            return Response({"detail": "Invalid month or year."}, status=status.HTTP_400_BAD_REQUEST)

        # Calculate start and end dates for the given month and year
        start_date = datetime(year, month, 1)
        end_date = start_date.replace(day=1, month=month+1) - timedelta(days=1)

        # Query for habits active during the given month and year
        habits = Habit.objects.filter(start_date__lte=end_date, goal_date__gte=start_date)


        # Check if there are any habits available for the specified month and year
        if not habits:
            return Response({"detail": "No habits found for the specified month and year."}, status=status.HTTP_404_NOT_FOUND)

        # Initialize a dictionary to store completion counts and completion rates for each habit
        habit_completion_info = {}

        # Loop through habits and calculate completion counts and rates within the specified month
        for habit in habits:
            completions_within_month = habit.completions.filter(completion_date__gte=start_date, completion_date__lte=end_date).count()
            expected_days = (end_date - start_date).days + 1
            completion_rate = completions_within_month / expected_days * 100 if expected_days > 0 else 0
            habit_completion_info[habit] = {"completions": completions_within_month, "rate": completion_rate}

        # Check if there are any completion info available
        if not habit_completion_info:
            return Response({"detail": "No completion info found for habits within the specified month and year."}, status=status.HTTP_404_NOT_FOUND)

        # Find the habit with the lowest completion count
        struggled_habit, struggled_info = min(habit_completion_info.items(), key=lambda x: x[1]["completions"])
        struggled_habit_completions = struggled_info["completions"]
        struggled_habit_rate = struggled_info["rate"]
        
        # Calculate the rank of the struggled habit among all habits
        struggled_habit_rank = sum(1 for habit_info in habit_completion_info.values() if habit_info["completions"] < struggled_habit_completions) + 1

        # Create the reason for the most struggled habit
        reason = f"The habit '{struggled_habit.name}' has the lowest completion count of {struggled_habit_completions} out of expected {expected_days}, thus a completion rate of {struggled_habit_rate:.2f}%. "
        reason += f"It ranked lowest of all of {len(habit_completion_info)} habits during the entire month."

        # Serialize the struggled habit
        serializer = HabitSerializer(struggled_habit)
        
        # Return the struggled habit along with the reason
        return Response({"habit": serializer.data, "reason": reason})