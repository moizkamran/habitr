from django.urls import path
from .views import HabitView, CreateHabitView, UpdateHabitView, DeleteHabitView, HabitCompletionView, UpdateHabitStreakView, HighestStreakHabitView, UpdateHabitCompletionView

urlpatterns = [
    path("habit", HabitView.as_view()),
    path("create-habit", CreateHabitView.as_view()),
    path("update-habit/<int:pk>", UpdateHabitView.as_view()),
    path("update-habit-streak/<int:pk>", UpdateHabitStreakView.as_view()),
    path("update-habit-completion/<int:pk>", UpdateHabitCompletionView.as_view()),
    path("delete-habit/<int:pk>", DeleteHabitView.as_view()),
    path("habit-completion", HabitCompletionView.as_view()),
    path("highest-streak-habit", HighestStreakHabitView.as_view())
]