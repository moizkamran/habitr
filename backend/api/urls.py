from django.urls import path
from .views import HabitView, CreateHabitView, UpdateHabitView, DeleteHabitView

urlpatterns = [
    path("habit", HabitView.as_view()),
    path("create-habit", CreateHabitView.as_view()),
    path("update-habit/<int:pk>", UpdateHabitView.as_view()),
    path("delete-habit/<int:pk>", DeleteHabitView.as_view()),
]