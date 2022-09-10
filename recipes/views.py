from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser

# From Recipe App:
from .models import Recipe, OtherIngredient, OtherIngredientAmount, EssentialOilAmount, BaseOilAmount
from .serializers.common import RecipeSerializer, CreateRecipeSerializer, OtherIngredientSerializer, OtherIngredientAmountSerializer, EssentialOilAmountSerializer, BaseOilAmountSerializer
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

class RecipeDetailView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get_recipe(self, pk):
    try:
      return Recipe.objects.get(pk=pk)
    except Recipe.DoesNotExist:
      raise NotFound(detail="Recipe not found")

  def get(self, _request, pk):
    recipe = self.get_recipe(pk=pk)
    serialized_recipe = PopulatedRecipeSerializer(recipe)
    return Response(serialized_recipe.data)

  def put(self, request, pk):
    recipe_to_update = self.get_recipe(pk=pk)
    updated_recipe = PopulatedRecipeSerializer(recipe_to_update, data=request.data)
    try: 
      updated_recipe.is_valid(True)
      updated_recipe.save()
      return Response(updated_recipe.data, status=status.HTTP_202_ACCEPTED)
    except Exception as e:
      print('e->', e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

  def delete(self, request, pk):
    recipe_to_delete = self.get_book(pk=pk)
    if recipe_to_delete.owner != request.user or request.user.is_superuser:
      raise PermissionDenied("Unauthorised")
    recipe_to_delete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

  # * CREATE RECIPE ---------

  # ! We need to use a serialiser the doesn't have the populated Application and Remedy Serialiser (so just ids in this form: application: [1,2]). And we need to just get the id field for owner (not username, profile image and id)

class CreateRecipeView(APIView):
  permission_classes = (IsAuthenticated, IsAdminUser )

  def post(self, request):
    request.data['owner'] = request.user.id
    print('data w/ owner', request.data)
    # essential_oil_amount_add = EssentialOilAmountSerializer(data=request.data.essential_oil_amount)
    # request.data.pop("essential_oil_amount")
    recipe_to_add = CreateRecipeSerializer(data=request.data)
    try: 
      # essential_oil_amount_add.is_valid()
      # essential_oil_amount_add.save()
      recipe_to_add.is_valid()
      recipe_to_add.save()
      return Response(recipe_to_add.data , status=status.HTTP_201_CREATED)
    except Exception as e:
      print('e->', e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)

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

