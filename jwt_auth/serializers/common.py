from rest_framework import serializers

# Auth
from django.contrib.auth import get_user_model, password_validation
User = get_user_model()
from rest_framework.exceptions import ValidationError 
from django.contrib.auth.hashers import make_password

# Models
from ..models import User, BookmarkedRecipe, TestedRecipe

# * All User Data Serializer
class UserSerializer(serializers.ModelSerializer):
  class Meta: 
    model = User
    fields = "__all__"

# * Register Serializer
class UserRegisterSerializer(serializers.ModelSerializer):
  
  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)

  def validate(self, data):
    password = data.pop('password')
    password_confirmation = data.pop('password_confirmation')

    if password != password_confirmation:
      raise ValidationError({'password_confirmation': 'Does not match password'})

    password_validation.validate_password(password) # Check for strong password (default errors returned)

    data['password'] = make_password(password) # Hash the password

    return data

  class Meta:
    model = User
    fields = ('id','email','username', 'profile_image', 'password', 'password_confirmation')


# * User Minimized Serializer (Used for Reviews)
class UserMinSerializer(serializers.ModelSerializer):
  class Meta: 
    model = User
    fields = ('username','profile_image','id')

# * Bookmarked Recipe Serializer
class BookmarkedRecipeSerializer(serializers.ModelSerializer):
  class Meta: 
    model = BookmarkedRecipe
    fields = "__all__"

# * Tested Recipe Serializer
class TestedRecipeSerializer(serializers.ModelSerializer):
  class Meta: 
    model = TestedRecipe
    fields = "__all__"