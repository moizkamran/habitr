from django.db import models
from datetime import date

class Habit(models.Model):
    """
    Model representing a habit to be tracked.
    """
    HABIT_TYPES = [
        ('Quit', 'Quit'),
        ('Start', 'Start'),
    ]
    name = models.CharField(max_length=100, default="Habit Name", help_text="Enter the name of the habit.")
    description = models.CharField(max_length=200, default="A habit description", help_text="Enter a brief description of the habit.")
    frequency = models.CharField(max_length=100, default="Daily", help_text="Enter the frequency of the habit (e.g., Daily, Weekly).")
    start_date = models.DateField(default=date(2024, 1, 1), help_text="Enter the start date for tracking the habit.")
    goal_date = models.DateField(default=date(2024, 1, 1), help_text="Enter the goal date for achieving the habit.")
    completed = models.BooleanField(default=False, help_text="Check if the habit is completed.")
    streak = models.IntegerField(default=0, help_text="Number of consecutive days the habit has been completed.")
    type = models.CharField(max_length=5, choices=HABIT_TYPES, help_text="Select the type of habit (Quit or Start).")

    def __str__(self):
        """
        String representation of the Habit object.
        """
        return self.name

    def completions_list(self):
        """
        Returns a QuerySet of HabitCompletion objects related to this Habit.
        """
        return self.completions.all()

class HabitCompletion(models.Model):
    """
    Model representing a completion of a habit for a particular date.
    """
    habit = models.ForeignKey(Habit, related_name='completions', on_delete=models.CASCADE)
    completion_date = models.DateField(default=date.today, help_text="Date when the habit was completed.")

    class Meta:
        unique_together = (('habit', 'completion_date'),)
