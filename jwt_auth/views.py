from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import User, BookmarkedRecipe, TestedRecipe
from .serializers.common import BookmarkedRecipeSerializer, UserSerializer
from .serializers.populated import PopulatedUserSerializer, PopulatedBookmarkedRecipeSerializer, PopulatedTestedRecipeSerializer

# Create your views here.

# ! User View

class UserListView(APIView):

  def get(self, _request):
    users = User.objects.all()
    print('Users->', users)
    serialized_users = PopulatedUserSerializer(users, many=True)
    print('Serialized Recipes ->', serialized_users)
    return Response(serialized_users.data, status=status.HTTP_200_OK)

#  ! Bookmarked List View

class BookmarkedListView(APIView):

  def get(self, _request):
    bookmarked = BookmarkedRecipe.objects.all()
    print('Bookmarked->', bookmarked)
    serialized_bookmarked = BookmarkedRecipeSerializer(bookmarked, many=True)
    print('Serialized bookmarked ->', serialized_bookmarked)
    return Response(serialized_bookmarked.data, status=status.HTTP_200_OK)

# ! Tested List View

class TestedListView(APIView):

  def get(self, _request):
    tested = TestedRecipe.objects.all()
    print('Tested->', tested)
    serialized_tested = TestedRecipe(tested, many=True)
    print('Serialized Tested->', serialized_tested)

    return Response(serialized_tested.data, status=status.HTTP_200_OK)