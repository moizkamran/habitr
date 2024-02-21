from rest_framework import generics
from .models import Habit
from rest_framework.response import Response
from rest_framework import status
from .serializers import HabitSerializer

class HabitView(generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer

class HabitDetailView(generics.RetrieveDestroyAPIView):
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"detail": "Habit has been deleted"}, status=status.HTTP_204_NO_CONTENT)
