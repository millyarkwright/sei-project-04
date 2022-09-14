from recipes.serializers.common import RecipeIndexSerializer
from .common import UserSerializer, BookmarkedRecipeSerializer, TestedRecipeSerializer
from recipes.serializers.common import RecipeSerializer


class PopulatedBookmarkedRecipeSerializer(BookmarkedRecipeSerializer):
  bookmarked_recipe = RecipeIndexSerializer()

class PopulatedTestedRecipeSerializer(TestedRecipeSerializer):
  tested_recipe = RecipeIndexSerializer()

class PopulatedUserSerializer(UserSerializer):
  bookmarked_recipes = PopulatedBookmarkedRecipeSerializer(many=True)
  tested_recipes = PopulatedTestedRecipeSerializer(many=True)
  created_recipes = RecipeIndexSerializer(many=True)

class PopulatedUserPublicSerializer(UserSerializer):
  created_recipes = RecipeIndexSerializer(many=True)