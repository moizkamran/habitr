from rest_framework import serializers
from .models import Habit

class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ("id" ,"name", "description", "frequency", "type",
                   "start_date", "goal_date", "completed", "streak")
    
    def create(self, validated_data):
        """
        Create and return a new `Habit` instance, given the validated data.
        """
        return Habit.objects.create(**validated_data)