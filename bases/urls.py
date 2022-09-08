from django.urls import path
from .views import BaseOilListView 

urlpatterns = [
  path('', BaseOilListView.as_view())
]