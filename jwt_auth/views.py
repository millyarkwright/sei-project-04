from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, IsAdminUser

# Auth
from django.contrib.auth import get_user_model
User = get_user_model
import jwt
from datetime import datetime, timedelta

# Models
from .models import User, BookmarkedRecipe, TestedRecipe
from django.conf import settings 

# Serializers
from .serializers.common import UserSerializer, UserRegisterSerializer, BookmarkedRecipeSerializer, TestedRecipeSerializer
from .serializers.populated import PopulatedUserSerializer, PopulatedUserPublicSerializer


# ! REGISTER VIEW -------
class RegisterView(APIView):
  def post(self, request):
    user_to_create = UserRegisterSerializer(data=request.data)
    try:
      user_to_create.is_valid(True)
      user_to_create.save()
      return Response(user_to_create.data, status.HTTP_202_ACCEPTED)
    except Exception as e:
      print('e->', e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

#  ! LOGIN VIEW ---------
class LoginView(APIView):
  def post(self, request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    try:
      user_to_login = User.objects.get(username=username)
    except User.DoesNotExist:
      print('Failed at username stage')
      raise PermissionDenied('Invalid credentials')

    if not user_to_login.check_password(password):
      print('Failed at password stage')
      raise PermissionDenied('Invalid Credentials')

    dt = datetime.now() + timedelta(days=7)

    token = jwt.encode(
      {
        'sub': user_to_login.id,
        'exp': int(dt.strftime('%s'))
      },
      settings.SECRET_KEY,
      'HS256'
    )
    print('Token->', token)

    return Response({ 'token': token, 'message': f"Welcome back {user_to_login.username}" })


# ! DELETE PROFILE

class UserProfilePrivateView(APIView):
  def get(self, request):
    print('USERNAMEEE->', request.user.username)
    # request_username = request.user.username
    user = User.objects.get(username=request.user.username)
    print('Users->', user)
    if user.username == request.user.username or request.user.is_superuser == True:
          serialized_user = PopulatedUserSerializer(user)
          print('Serialized Recipes ->', serialized_user)
          return Response(serialized_user.data, status=status.HTTP_200_OK)
    else:
      raise PermissionDenied("Unauthorised")


class UserProfileView(APIView):
  # permission_classes = [IsAuthenticatedOrReadOnly, IsAdminUser]

  def get(self, request, username):
    user = User.objects.get(username=username)
    print('Users->', user)
    # if user.username == request.user.username or request.user.is_superuser == True:
    serialized_user = PopulatedUserPublicSerializer(user)
    print('Serialized Recipes ->', serialized_user)
    return Response(serialized_user.data, status=status.HTTP_200_OK)
    # else:
      # raise PermissionDenied("Unauthorised")


  def delete(self, request, username):
    user_to_delete= User.objects.get(username=username)
    print('user to be deleted')
    if user_to_delete.username == request.user.username or request.user.is_superuser == True:
      user_to_delete.delete()
      return Response({'message': 'User successfully deleted'})
    else:
      raise PermissionDenied("Unauthorised")
  




# ! USER LIST VIEW --------
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
  permission_classes = (IsAuthenticated,)

  # * POST (ADD TO BOOKMARKED) --------
  def post(self, request, pk):
    request.data['bookmarked_recipe'] = int(pk)
    request.data['bookmarked_by'] = request.user.id
    
    existing_bookmark_count = BookmarkedRecipe.objects.filter(bookmarked_recipe = request.data['bookmarked_recipe'], bookmarked_by = request.data['bookmarked_by']).count() 
    print('CHECK BOOKMARKED>', existing_bookmark_count)
    
    if existing_bookmark_count !=0:
      return Response({'detail': 'You have already bookmarked this recipe!'})

    # if not request.user.id:
    #   return Response({'detail': 'Please login to bookmark this recipe'})
  
    bookmark_to_add= BookmarkedRecipeSerializer(data=request.data)
    
    try:
      bookmark_to_add.is_valid(True)
      bookmark_to_add.save()
      print('bookmark_to_add.data',bookmark_to_add.data)
      return Response({'detail':'Recipe added to bookmarks📚'}, status=status.HTTP_201_CREATED)
    except Exception as e:
      print('e->', e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

  # * DELETE (DELETE FROM TO BOOKMARKED) --------
  def get_bookmark(self, pk):
        try:
            return BookmarkedRecipe.objects.get(pk=pk)
        except BookmarkedRecipe.DoesNotExist:
            raise NotFound("Bookmarked recipe not found!")

  def delete(self, request, pk):
    bookmark_to_delete = self.get_bookmark(pk)
    # print('bookmark owner ->', bookmark_to_delete.owner)
    # print('request user ->', request.user)

    # bookmark_to_delete.delete()
    # return Response(status=status.HTTP_204_NO_CONTENT)

    try:
      bookmark_to_delete.delete()
      return Response({'detail': 'Recipe has been removed from bookmarks'}, status=status.HTTP_200_OK)
    except Exception as e:
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    

# ! TESTED LIST VIEW --------
class TestedListView(APIView):

  def get(self, _request):
    tested = TestedRecipe.objects.all()
    print('Tested->', tested)
    serialized_tested = TestedRecipeSerializer(tested, many=True)
    print('Serialized Tested->', serialized_tested)
    return Response(serialized_tested.data, status=status.HTTP_200_OK)

#  ! TEST ADD/DELETE-----------
class TestedView(APIView):
  permission_classes = (IsAuthenticated,)

  # * POST (ADD TO TESTED) --------
  def post(self, request, pk):
    request.data['tested_recipe'] = int(pk)
    request.data['tested_by'] = request.user.id
    
    existing_tested_count = TestedRecipe.objects.filter(tested_recipe = request.data['tested_recipe'], tested_by = request.data['tested_by']).count() 
    print('CHECK TESTED>', existing_tested_count)
    if existing_tested_count !=0:
      return Response({'detail': 'You have already tested this recipe!'}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


    test_to_add= TestedRecipeSerializer(data=request.data)
    try:
      test_to_add.is_valid(True)
      test_to_add.save()
      return Response({'detail':'Successfully added to tested recipes👩‍🍳'}, status=status.HTTP_201_CREATED)
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
    # print('bookmark owner ->', test_to_delete.owner)
    # print('request user ->', request.user)

    test_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)