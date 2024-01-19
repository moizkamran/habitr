from django.urls import path
from .views import HabitView

urlpatterns = [
    path("habit", HabitView.as_view()),
]