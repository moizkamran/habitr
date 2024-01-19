from rest_framework import serializers
from .models import Habit

class HabitSerializer(serializers.Serializer):
    class meta:
        model = Habit
        fields = ("name", "description", "frequency", "start_date", "goal_date")
    
    def create(self, validated_data):
        """
        Create and return a new `Habit` instance, given the validated data.
        """
        return Habit.objects.create(**validated_data)