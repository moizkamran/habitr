from django.db import models
from datetime import date

# Create your models here.
class Habit(models.Model):
    name = models.CharField(max_length=100, default="Habit Name")
    description = models.CharField(max_length=200, default="A habit description")
    frequency = models.IntegerField(default=1)
    start_date = models.DateField(default=date(2024, 1, 1))
    goal_date = models.DateField(default=date(2024, 1, 1))
    completed = models.BooleanField(default=False)
    streak = models.IntegerField(default=0)