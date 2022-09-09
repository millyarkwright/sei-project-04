from recipes.serializers.common import RecipeIndexSerializer
from .common import UserSerializer, BookmarkedRecipeSerializer, TestedRecipeSerializer
from recipes.serializers.common import RecipeIndexSerializer


class PopulatedBookmarkedRecipeSerializer(BookmarkedRecipeSerializer):
  recipe = RecipeIndexSerializer()

class PopulatedTestedRecipeSerializer(TestedRecipeSerializer):
  recipe = RecipeIndexSerializer()

class PopulatedUserSerializer(UserSerializer):
  bookmarked_recipes = PopulatedBookmarkedRecipeSerializer(many=True)
  tested_recipes = PopulatedTestedRecipeSerializer(many=True)