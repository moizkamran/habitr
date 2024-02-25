from rest_framework import serializers
from .models import Habit, HabitCompletion

class HabitCompletionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HabitCompletion
        fields = ("completion_date",)

class HabitSerializer(serializers.ModelSerializer):
    completions = serializers.SerializerMethodField()

    class Meta:
        model = Habit
        fields = ("id" ,"name", "description", "frequency", "type",
                   "start_date", "goal_date", "completed", "streak", "completions")

    def get_completions(self, obj):
        completions = HabitCompletion.objects.filter(habit=obj)
        return HabitCompletionSerializer(completions, many=True).data
    
class CreateHabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ("name", "description", "frequency", "type",
                   "start_date", "goal_date", "completed", "streak", "completions")

class UpdateHabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ("name", "description", "frequency", "type",
                   "start_date", "goal_date", "completed", "streak", "completions")
        
class UpdateHabitStreakSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ("streak",)

class UpdateHabitCompletionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ("completed",)
        
class DeleteHabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ("id")


