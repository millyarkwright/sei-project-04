from django.urls import path
from .views import BaseOilListView, BaseOilDetailView

urlpatterns = [
  path('', BaseOilListView.as_view()),
  path('<int:pk>/', BaseOilDetailView.as_view()),
]