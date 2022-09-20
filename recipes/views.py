from doctest import OutputChecker
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, IsAdminUser

# From Recipe App:
from .models import Recipe, OtherIngredient, OtherIngredientAmount, EssentialOilAmount, BaseOilAmount
from .serializers.common import RecipeSerializer, CreateRecipeSerializer, OtherIngredientSerializer, OtherIngredientAmountSerializer, EssentialOilAmountSerializer, BaseOilAmountSerializer, BaseOilAmountFullSerializer, EssentialOilAmountFullSerializer, OtherIngredientAmountFullSerializer
from .serializers.populated import PopulatedOtherIngredientAmountSerializer, PopulatedRecipeSerializer, PopulatedOtherIngredientSerializer, PopulatedEssentialOilAmountSerializer

# ! Recipe Views

class RecipeListView(APIView):

  def get(self, _request):
    recipes = Recipe.objects.all()
    print('Recipes->', recipes)
    serialized_recipes = PopulatedRecipeSerializer(recipes, many=True)
    # print('Serialized Recipes ->', serialized_recipes)
    return Response(serialized_recipes.data, status=status.HTTP_200_OK)

class RecipeDetailView(APIView):
  # permission_classes = (IsAuthenticatedOrReadOnly, ) 
  # --> Need to remove if  we want to get the canned responses rather than the auth response "Invalid Token"

  def get_recipe(self, pk):
    try:
      return Recipe.objects.get(pk=pk)
    except Recipe.DoesNotExist:
      raise NotFound(detail="Recipe not found")

  def get(self, _request, pk):
    recipe = self.get_recipe(pk=pk)
    serialized_recipe = PopulatedRecipeSerializer(recipe)
    return Response(serialized_recipe.data)

  def patch(self, request, pk):
    print('PATCH RECIPEEE REQUEST DATA ->>>')
    print(request.data)
    recipe_to_update = self.get_recipe(pk=pk)
    
    updated_recipe = CreateRecipeSerializer(recipe_to_update, data=request.data, partial=True)
    
    if recipe_to_update.owner == request.user or request.user.is_superuser == True:
      try: 
        updated_recipe.is_valid(True)
        updated_recipe.save()
        return Response(updated_recipe.data, status=status.HTTP_202_ACCEPTED)
      except Exception as e:
        print('e->', e)
        return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    else:
      raise PermissionDenied("You are not authorised to edit this recipe.")

  def delete(self, request, pk):
    recipe_to_delete = self.get_recipe(pk=pk)

    if recipe_to_delete.owner == request.user or request.user.is_superuser == True:
      recipe_to_delete.delete()
      return Response({'detail':'Recipe sucessfully deleted'} ,status=status.HTTP_200_OK)

      # return Response(status=status.HTTP_204_NO_CONTENT)
    else:
      raise PermissionDenied("You are not authorised to delete this recipe.")

  # * CREATE RECIPE ---------

  # ! We need to use a serialiser the doesn't have the populated Application and Remedy Serialiser (so just ids in this form: application: [1,2]). And we need to just get the id field for owner (not username, profile image and id)

class CreateRecipeView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )

  def post(self, request):
    req_eo_amount = request.data['eo_amount']
    req_bo_amount = request.data['bo_amount']
    req_oi_amount = request.data['oi_amount']

    recipe_request = request.data
    recipe_request.pop('eo_amount')
    recipe_request.pop('bo_amount')
    recipe_request.pop('oi_amount')
    print('CREATE RECIPEEE REQUEST DATA ->>>', request.data)
    print('NEW EO AMOUNT ->>>', req_eo_amount)
    print('NEW BO AMOUNT ->>>', req_bo_amount)
    print('NEW OI AMOUNT ->>>', req_oi_amount)

    recipe_request['owner'] = request.user.id
    print('-----NEW RECIPE REQUEST ->>>', recipe_request)

    recipe_to_add = CreateRecipeSerializer(data=recipe_request)

    print('-------RECIPE_TO_ADD--------')
    print(recipe_to_add)
    print('------------------------')

    try: 
      recipe_to_add.is_valid(True)
      recipe_to_add.save()
      print('-------NEW RECIPE_TO_ADD--------')
      print(recipe_to_add.data)
      print('-------NEW RECIPE_ID--------')
      print(recipe_to_add.data['id'])

      for item in req_eo_amount:
        item['recipe'] = recipe_to_add.data['id']
        amount_to_add = EssentialOilAmountFullSerializer(data=item)
        amount_to_add.is_valid(True)
        amount_to_add.save()
        
      for item in req_bo_amount:
        item['recipe'] = recipe_to_add.data['id']
        amount_to_add = BaseOilAmountFullSerializer(data=item)
        amount_to_add.is_valid(True)
        amount_to_add.save()  

      for item in req_oi_amount:
        item['recipe'] = recipe_to_add.data['id']
        amount_to_add = OtherIngredientAmountFullSerializer(data=item)
        amount_to_add.is_valid(True)
        amount_to_add.save()

      return Response({'detail': 'Recipe successfully added!'}, status=status.HTTP_201_CREATED)
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
    serialized_other_ingredient_amounts = PopulatedOtherIngredientAmountSerializer(other_ingredient_amounts, many=True)
    print('Serialized Other Ingredient Amounts->', serialized_other_ingredient_amounts)
    print('Serialized Other Ingredient Amounts DATA->', serialized_other_ingredient_amounts.data)

    return Response(serialized_other_ingredient_amounts.data, status=status.HTTP_200_OK)

class OtherIngredientAmountView(APIView):
    # * POST (ADD) OTHER INGREDIENT AMOUNT -------------
  def post(self, request, pk):
    request.data['recipe'] = int(pk)
    oi_amount_to_create = OtherIngredientAmountFullSerializer(data=request.data)
    try:
      oi_amount_to_create.is_valid(True)
      oi_amount_to_create.save()
      return Response(oi_amount_to_create.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print('e->', e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  
  def get_oi_amount(self, pk):
    try:
      return OtherIngredientAmount.objects.get(pk=pk)
    except OtherIngredientAmount.DoesNotExist:
      raise NotFound(detail="Other Ingredient Amount not found")
  
  def patch(self, request, pk):
    oi_amount_to_update = self.get_oi_amount(pk=pk)
    updated_oi_amount = OtherIngredientAmountSerializer(oi_amount_to_update, data=request.data, partial=True)
    if oi_amount_to_update.owner == request.user or request.user.is_superuser == True:
      try: 
        updated_oi_amount.is_valid(True)
        updated_oi_amount.save()
        return Response(updated_oi_amount.data, status=status.HTTP_202_ACCEPTED)
      except Exception as e:
        print('e->', e)
        return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    else:
      raise PermissionDenied("You are not authorised to edit this ingredient.")
 
  def delete(self, request, pk):
      oi_amount_to_delete = self.get_oi_amount(pk=pk)
      if oi_amount_to_delete .owner == request.user or request.user.is_superuser == True:
        oi_amount_to_delete.delete()
        return Response({'message': 'Other ingredient amount successfully deleted'})
      else:
        raise PermissionDenied("You are not authorised to delete this ingredient.")

# ! Essential Oil Views

class EssentialOilAmountListView(APIView):

  def get(self, _request):
    essential_oil_amounts = EssentialOilAmount.objects.all()
    print('essential_oil_amounts->', essential_oil_amounts)
    serialized_essential_oil_amounts = EssentialOilAmountFullSerializer(essential_oil_amounts, many=True)
    print('Serialized essential_oil_amounts->', serialized_essential_oil_amounts)
    return Response(serialized_essential_oil_amounts.data, status=status.HTTP_200_OK)

class EssentialOilAmountView(APIView):
  def post(self, request, pk):
    request.data['recipe'] = int(pk)
    print('-------REQUEST WITH RECIPE ID --------', request.data)
    eo_amount_to_create = EssentialOilAmountFullSerializer(data=request.data)
    try:
      eo_amount_to_create.is_valid(True)
      eo_amount_to_create.save()
      return Response(eo_amount_to_create.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print('e->', e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  
  def get_eo_amount(self, pk):
    try:
      return EssentialOilAmount.objects.get(pk=pk)
    except EssentialOilAmount.DoesNotExist:
      raise NotFound(detail="EssentialOil Amount not found")
  
  def patch(self, request, pk):
    eo_amount_to_update = self.get_eo_amount(pk=pk)
    updated_eo_amount = EssentialOilAmountSerializer(eo_amount_to_update, data=request.data)
    if eo_amount_to_update.owner == request.user or request.user.is_superuser == True:
      try: 
        updated_eo_amount.is_valid(True)
        updated_eo_amount.save()
        return Response(updated_eo_amount.data, status=status.HTTP_202_ACCEPTED) 
      except Exception as e:
        print('e->', e)
        return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    else:
      raise PermissionDenied("You are not authorised to edit this ingredient.")

  def delete(self, request, pk):
    eo_amount_to_delete = self.get_eo_amount(pk=pk)
    if eo_amount_to_delete.owner == request.user or request.user.is_superuser == True:
      eo_amount_to_delete.delete()
      return Response({'message': 'Essential oil Amount successfully deleted'})
    else:
      raise PermissionDenied("You are not authorised to delete this Essentential Oil ingredient.")

# ! Base Oil View 

class BaseOilAmountListView(APIView):

  def get(self, _request):
    base_oil_amounts = BaseOilAmount.objects.all()
    print('base_oil_amounts->', base_oil_amounts)
    serialized_base_oil_amounts = BaseOilAmountFullSerializer(base_oil_amounts, many=True)
    print('Serialized base_oil_amounts->', serialized_base_oil_amounts)
    return Response(serialized_base_oil_amounts.data, status=status.HTTP_200_OK)

class BaseOilAmountView(APIView):
  def post(self, request, pk):
    request.data['recipe'] = int(pk)
    bo_amount_to_create = BaseOilAmountFullSerializer(data=request.data)
    try:
      bo_amount_to_create.is_valid(True)
      bo_amount_to_create.save()
      return Response(bo_amount_to_create.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      print('e->', e)
      return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  
  def get_bo_amount(self, pk):
    try:
      return BaseOilAmount.objects.get(pk=pk)
    except BaseOilAmount.DoesNotExist:
      raise NotFound(detail="BaseOil Amount not found")

  def patch(self, request, pk):
    bo_amount_to_update = self.get_bo_amount(pk=pk)
    updated_bo_amount = BaseOilAmountSerializer(bo_amount_to_update, data=request.data)
    if bo_amount_to_update.owner == request.user or request.user.is_superuser == True:
      try: 
        updated_bo_amount.is_valid(True)
        updated_bo_amount.save()
        return Response(updated_bo_amount.data, status=status.HTTP_202_ACCEPTED) 
      except Exception as e:
        print('e->', e)
        return Response(e.__dict__ if e.__dict__ else str(e), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    else:
      raise PermissionDenied("You are not authorised to edit this ingredient.")

  def delete(self, request, pk):
    bo_amount_to_delete = self.get_bo_amount(pk=pk)
    if bo_amount_to_delete.owner == request.user or request.user.is_superuser == True:
      bo_amount_to_delete.delete()
      return Response({'message': 'Base oil Amount successfully deleted'})
    else:
      raise PermissionDenied("You are not authorised to delete this Base Oil ingredient.")