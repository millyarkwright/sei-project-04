from django.urls import path
from .views import RemedyListView

urlpatterns = [
  path('', RemedyListView.as_view())
]