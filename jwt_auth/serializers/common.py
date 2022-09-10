from rest_framework import serializers
from ..models import User, BookmarkedRecipe, TestedRecipe

class UserSerializer(serializers.ModelSerializer):
  class Meta: 
    model = User
    fields = "__all__"

class UserMinSerializer(serializers.ModelSerializer):
  class Meta: 
    model = User
    fields = ('username','profile_image','id')

class BookmarkedRecipeSerializer(serializers.ModelSerializer):
  class Meta: 
    model = BookmarkedRecipe
    fields = "__all__"

class TestedRecipeSerializer(serializers.ModelSerializer):
  class Meta: 
    model = TestedRecipe
    fields = "__all__"