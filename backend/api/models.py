from django.db import models

# Create your models here.
class Habit(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    frequency = models.IntegerField(default=1)
    start_date = models.DateField()
    goal_date = models.DateField()
    completed = models.BooleanField(default=False)
    streak = models.IntegerField(default=0, null=False)

class Progress(models.Model):
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)
    dates = models.DateField()