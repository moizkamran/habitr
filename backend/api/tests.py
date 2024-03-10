from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory
from .models import Habit, HabitCompletion
from .views import (
    CreateHabitView,
    DeleteHabitView,
    HabitCompletionView,
    UpdateHabitStreakView,
    HighestStreakHabitView,
)

class HabitViewTests(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_create_habit(self):
        habit_data = {'name': 'Test Habit', 'start_date': '2024-03-10', 'goal_date': '2024-03-20', 
                      'streak': 3, 'type': 'Start', 'frequency': 'Daily',
                      'description': 'A test habit.',
                      'completed': False,
                      'completions': []}
        request = self.factory.post('/api/create-habit/', habit_data, format='json')
        view = CreateHabitView.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Habit.objects.count(), 1)
        self.assertEqual(Habit.objects.get().name, 'Test Habit')

    def test_delete_habit(self):
        habit = Habit.objects.create(name='Test Habit', start_date='2024-03-10', goal_date='2024-03-20')
        request = self.factory.delete(f'/api/delete-habit/{habit.pk}')
        view = DeleteHabitView.as_view()
        response = view(request, pk=habit.pk)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Habit.objects.count(), 0)

    def test_habit_completion(self):
        habit = Habit.objects.create(name='Test Habit', start_date='2024-03-10', goal_date='2024-03-20')
        completion_data = {'habit': habit.pk, 'completion_date': '2024-03-15'}
        request = self.factory.post('/api/habit-completion/', completion_data, format='json')
        view = HabitCompletionView.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(HabitCompletion.objects.count(), 1)

    def test_update_habit_streak(self):
        habit = Habit.objects.create(name='Test Habit', start_date='2024-03-10', goal_date='2024-03-20', streak=5)
        updated_data = {'streak': 7}
        request = self.factory.put(f'/api/update-habit-streak/{habit.pk}', updated_data, format='json')
        view = UpdateHabitStreakView.as_view()
        response = view(request, pk=habit.pk)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Habit.objects.get(pk=habit.pk).streak, 7)

    def test_highest_streak_habit(self):
        # Create habits with different streaks
        Habit.objects.create(name='Habit 1', streak=3)
        Habit.objects.create(name='Habit 2', streak=6)
        Habit.objects.create(name='Habit 3', streak=9)

        request = self.factory.get('/api/highest-streak-habit/')
        view = HighestStreakHabitView.as_view()
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Habit 3')

