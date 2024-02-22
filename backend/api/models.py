from django.db import models
from datetime import date

# Create your models here.
class Habit(models.Model):
    HABIT_TYPES = [
        ('Quit', 'Quit'),
        ('Start', 'Start'),
    ]
    name = models.CharField(max_length=100, default="Habit Name")
    description = models.CharField(max_length=200, default="A habit description")
    frequency = models.CharField(max_length=100, default="Daily")
    start_date = models.DateField(default=date(2024, 1, 1))
    goal_date = models.DateField(default=date(2024, 1, 1))
    completed = models.BooleanField(default=False)
    streak = models.IntegerField(default=0)
    # could be two types "Quit" or "Start"
    type = models.CharField(max_length=5, choices=HABIT_TYPES)

class HabitCompletion(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)
    completion_date = models.DateField(default=date.today)