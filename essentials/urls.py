from django.urls import path
from .views import EssentialListView

urlpatterns = [
  path('', EssentialListView.as_view())
]