from rest_framework import serializers
from .models import Habit

class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ("id" ,"name", "description", "frequency", "type",
                   "start_date", "goal_date", "completed", "streak")
    
class CreateHabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ("name", "description", "frequency", "type",
                   "start_date", "goal_date", "completed", "streak")

class UpdateHabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ("name", "description", "frequency", "type",
                   "start_date", "goal_date", "completed", "streak")
        
class DeleteHabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ("id")
