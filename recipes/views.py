from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Recipe, OtherIngredient, OtherIngredientAmount, EssentialOilAmount, BaseOilAmount
from .serializers.common import RecipeSerializer, OtherIngredientSerializer, OtherIngredientAmountSerializer, EssentialOilAmountSerializer, BaseOilAmountSerializer
from .serializers.populated import PopulatedRecipeSerializer, PopulatedOtherIngredientSerializer

# Create your views here.

# ! Recipe Views

class RecipeListView(APIView):

  def get(self, _request):
    recipes = Recipe.objects.all()
    print('Recipes->', recipes)
    serialized_recipes = PopulatedRecipeSerializer(recipes, many=True)
    print('Serialized Recipes ->', serialized_recipes)
    return Response(serialized_recipes.data, status=status.HTTP_200_OK)

#  ! Other Ingredients Views

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
    print('Serialized Other Ingredient Amounts DATA->', serialized_other_ingredient_amounts.data)

    return Response(serialized_other_ingredient_amounts.data, status=status.HTTP_200_OK)

# ! Essential Oil Views

class EssentialOilAmountListView(APIView):

  def get(self, _request):
    essential_oil_amounts = EssentialOilAmount.objects.all()
    print('essential_oil_amounts->', essential_oil_amounts)
    serialized_essential_oil_amounts = EssentialOilAmountSerializer(essential_oil_amounts, many=True)
    print('Serialized essential_oil_amounts->', serialized_essential_oil_amounts)
    return Response(serialized_essential_oil_amounts.data, status=status.HTTP_200_OK)

# ! Base Oil View 

class BaseOilAmountListView(APIView):

  def get(self, _request):
    base_oil_amounts = BaseOilAmount.objects.all()
    print('base_oil_amounts->', base_oil_amounts)
    serialized_base_oil_amounts = BaseOilAmountSerializer(base_oil_amounts, many=True)
    print('Serialized base_oil_amounts->', serialized_base_oil_amounts)
    return Response(serialized_base_oil_amounts.data, status=status.HTTP_200_OK)
