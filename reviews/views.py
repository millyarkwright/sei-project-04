from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied, ValidationError, APIException
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .serializers.common import ReviewSerializer
from .models import Review

# CUSTOM EXCEPTIONS
class RatingException(APIException):
  status_code = 422,
  default_detail = 'Please also rate the recipe!'
  default_code = 'unprocessable_entity'
# ----------------------------

# ! Review View -> Create & Delete Reviews

class ReviewView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )
  
  # * POST (ADD) REVIEW -------------
  def post(self, request, pk):
    request.data['recipe'] = int(pk)
    request.data['owner'] = request.user.id
    
    # Check if already reviewed - find review with same recipe id AND #find review with same owner id

    existing_review_count = Review.objects.filter(recipe = request.data['recipe'], owner = request.data['owner']).count() 
    print('CHECK REVIEWS>', existing_review_count)
    if existing_review_count !=0:
      return Response({'message': 'You have already reviewed this recipe!'})
    
    # Check rating is included
    data = request.data
    if data.get('rating') == None:
      raise RatingException()

    review_to_create = ReviewSerializer(data=request.data)
    
    try:
      review_to_create.is_valid(True)
      review_to_create.save()
      return Response(review_to_create.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print('e->', e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  
  # * DELETE REVIEW ------------------
  def get_review(self, pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            raise NotFound("Review not found!")

  def delete(self, request, pk):
    review_to_delete = self.get_review(pk)
    print('review ownner ->', review_to_delete.owner)
    print('request user ->', request.user)
    if review_to_delete.owner == request.user or request.user.is_superuser == True:
      review_to_delete.delete()
      return Response(status=status.HTTP_204_NO_CONTENT)
    else:
      raise PermissionDenied("You are not authorised to delete this review.")
    


