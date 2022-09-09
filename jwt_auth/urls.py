from django.urls import path
from .views import UserListView, BookmarkedListView, TestedListView

urlpatterns = [
  path('', UserListView.as_view()),
  path('bookmarked/', BookmarkedListView.as_view()),
  path('tested/', TestedListView.as_view()),

]