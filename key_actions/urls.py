from django.urls import path
from .views import KeyActionListView

urlpatterns = [
  path('', KeyActionListView.as_view())
]