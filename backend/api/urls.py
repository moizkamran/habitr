from django.urls import path
from .views import HabitView, HabitDetailView

urlpatterns = [
    path("habit/", HabitView.as_view()),
    path("habit/<int:pk>/", HabitDetailView.as_view()),
]
