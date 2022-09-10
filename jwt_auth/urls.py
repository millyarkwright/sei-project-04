from django.urls import path
from .views import UserListView, BookmarkedView, TestedView

urlpatterns = [
  path('', UserListView.as_view()), 
  path('bookmarked/<int:pk>', BookmarkedView.as_view()), 
  path('tested/<int:pk>', TestedView.as_view()),
]

