from django.urls import path
from .views import UserListView, UserProfileView, UserProfilePrivateView, RegisterView, LoginView, BookmarkedView, BookmarkedListView, TestedView, TestedListView

urlpatterns = [
  path('', UserListView.as_view()), 
  path('register/', RegisterView.as_view()),
  path('login/', LoginView.as_view()),
  path('profile/<username>/', UserProfileView.as_view()), 
  path('profile/', UserProfilePrivateView.as_view()), 
  path('bookmarks/', BookmarkedListView.as_view()), 
  path('bookmarked/<int:pk>/', BookmarkedView.as_view()), 
  path('tested/', TestedListView.as_view()),
  path('tested/<int:pk>/', TestedView.as_view()),
]

