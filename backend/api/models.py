from django.db import models

# Create your models here.
class Habit(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    frequency = models.IntegerField(max_length=7, default=1)
    start_date = models.DateField()
    goal_date = models.DateField()
    completed = models.BooleanField(default=False)
    streak = models.IntegerField(max_length=7, default=0, null=False)