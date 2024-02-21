from django.urls import path
from .views import HabitView, CreateHabitView

urlpatterns = [
    path("habit", HabitView.as_view()),
    path("create-habit", CreateHabitView.as_view()),
]