from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Recipe, OtherIngredient, OtherIngredientAmount
from .serializers.common import RecipeSerializer, OtherIngredientSerializer, OtherIngredientAmountSerializer
from .serializers.populated import PopulatedRecipeSerializer, PopulatedOtherIngredientSerializer
# Create your views here.

# ! Get All Recipes

class RecipeListView(APIView):

  def get(self, _request):
    recipes = Recipe.objects.all()
    print('Recipes->', recipes)
    serialized_recipes = PopulatedRecipeSerializer(recipes, many=True)
    print('Serialized Recipes ->', serialized_recipes)
    return Response(serialized_recipes.data, status=status.HTTP_200_OK)


class OtherIngredientListView(APIView):

  def get(self, _request):
    other_ingredients = OtherIngredient.objects.all()
    print('Other Ingredients->', other_ingredients)
    serialized_other_ingredients = OtherIngredientSerializer(other_ingredients, many=True)
    print('Serialized Other Ingredients ->', serialized_other_ingredients)
    return Response(serialized_other_ingredients.data, status=status.HTTP_200_OK)

class OtherIngredientAmountListView(APIView):

  def get(self, _request):
    other_ingredient_amounts = OtherIngredientAmount.objects.all()
    print('Other Ingredient Amounts->', other_ingredient_amounts)
    serialized_other_ingredient_amounts = OtherIngredientAmountSerializer(other_ingredient_amounts, many=True)
    print('Serialized Other Ingredient Amounts->', serialized_other_ingredient_amounts)
    return Response(serialized_other_ingredient_amounts.data, status=status.HTTP_200_OK)