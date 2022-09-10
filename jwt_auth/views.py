from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import User, BookmarkedRecipe, TestedRecipe
from .serializers.common import BookmarkedRecipeSerializer, TestedRecipeSerializer
from .serializers.populated import PopulatedUserSerializer

# Create your views here.

# ! USER VIEW --------
class UserListView(APIView):
  def get(self, _request):
    users = User.objects.all()
    print('Users->', users)
    serialized_users = PopulatedUserSerializer(users, many=True)
    print('Serialized Recipes ->', serialized_users)
    return Response(serialized_users.data, status=status.HTTP_200_OK)

#  ! BOOKMARKED LIST VIEW -----------
class BookmarkedListView(APIView):
  def get(self, _request):
    bookmarked = BookmarkedRecipe.objects.all()
    print('Bookmarked->', bookmarked)
    serialized_bookmarked = BookmarkedRecipeSerializer(bookmarked, many=True)
    print('Serialized bookmarked ->', serialized_bookmarked)
    return Response(serialized_bookmarked.data, status=status.HTTP_200_OK)

#  ! BOOKMARKED ADD/DELETE-----------
class BookmarkedView(APIView):

  # * POST (ADD TO BOOKMARKED) --------
  def post(self, request, pk):
    request.data['bookmarked_recipe'] = int(pk)
    bookmark_to_add= BookmarkedRecipeSerializer(data=request.data)
    try:
      bookmark_to_add.is_valid(True)
      bookmark_to_add.save()
      return Response(bookmark_to_add.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print('e->', e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

  # * DELETE (DELETE FROM TO BOOKMARKED) --------
  def get_bookmark(self, pk):
        try:
            return BookmarkedRecipe.objects.get(pk=pk)
        except BookmarkedRecipe.DoesNotExist:
            raise NotFound("BookedMark Recipe not found!")

  def delete(self, request, pk):
    bookmark_to_delete = self.get_bookmark(pk)
    print('bookmark ownner ->', bookmark_to_delete.owner)
    print('request user ->', request.user)
    
    bookmark_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# ! TESTED LIST VIEW --------
class TestedListView(APIView):

  def get(self, _request):
    tested = TestedRecipe.objects.all()
    print('Tested->', tested)
    serialized_tested = TestedRecipe(tested, many=True)
    print('Serialized Tested->', serialized_tested)
    return Response(serialized_tested.data, status=status.HTTP_200_OK)

#  ! TEST ADD/DELETE-----------
class TestedView(APIView):

  # * POST (ADD TO TESTED) --------
  def post(self, request, pk):
    request.data['tested_recipe'] = int(pk)
    test_to_add= TestedRecipeSerializer(data=request.data)
    try:
      test_to_add.is_valid(True)
      test_to_add.save()
      return Response(test_to_add.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print('e->', e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
      
  # * DELETE (DELETE FROM TESTED) --------
  def get_test(self, pk):
        try:
            return TestedRecipe.objects.get(pk=pk)
        except TestedRecipe.DoesNotExist:
            raise NotFound("Review not found!")

  def delete(self, request, pk):
    test_to_delete = self.get_test(pk)
    print('bookmark owner ->', test_to_delete.owner)
    print('request user ->', request.user)

    test_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)