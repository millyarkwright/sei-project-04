from django.urls import path 
from .views import CreateRecipeView, RecipeListView, RecipeDetailView, OtherIngredientListView, OtherIngredientAmountListView, EssentialOilAmountListView, BaseOilAmountListView,  OtherIngredientAmountView, EssentialOilAmountView, BaseOilAmountView


urlpatterns = [
  # GET ALL RECIPES
  path('', RecipeListView.as_view()),

  # GET, UPDATE & DELETE SINGLE RECIPE
  path('<int:pk>', RecipeDetailView.as_view()),

  # CREATE RECIPE
    path('createrecipe/', CreateRecipeView.as_view()),


  # GET OTHER INGREDIENTS LIST
  path('otheringredients/', OtherIngredientListView.as_view()),

  # GET LIST OF AMOUNTS
  path('otheringredientamounts/', OtherIngredientAmountListView.as_view()),
  path('otheringredientamounts/<int:pk>', OtherIngredientAmountListView.as_view()), # pk=recipeID(POST) pk=amountsID(DELETE)
  path('eoamounts/', EssentialOilAmountListView.as_view()),
  path('eoamounts/<int:pk>', EssentialOilAmountView.as_view()), # pk=recipeID(POST) pk=amountsID(DELETE)
  path('boamounts/', BaseOilAmountListView.as_view()),
  path('boamounts/<int:pk>', BaseOilAmountListView.as_view()), # pk=recipeID(POST) pk=amountsID(DELETE)
]