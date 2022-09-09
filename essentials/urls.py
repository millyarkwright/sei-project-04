from django.urls import path
from .views import EssentialListView, EssentialUsesListView, KeyActionListView

urlpatterns = [
  path('', EssentialListView.as_view()),
  path('uses/', EssentialUsesListView.as_view()),
  path('keyactions/', KeyActionListView.as_view())
]