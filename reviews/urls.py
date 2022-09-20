from django.urls import path
from .views import ReviewView

urlpatterns = [
    path('<int:pk>/', ReviewView.as_view()),
]

