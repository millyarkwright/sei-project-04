from django.urls import path 
from .views import RecipeListView, RecipeDetailView, OtherIngredientListView, OtherIngredientAmountListView, EssentialOilAmountListView, BaseOilAmountListView


urlpatterns = [
  # GET ALL RECIPES
  path('', RecipeListView.as_view()),

  # GET SINGLE RECIPE
  path('<int:pk>', RecipeDetailView.as_view()),

  # GET OTHER INGREDIENTS LIST
  path('otheringredients/', OtherIngredientListView.as_view()),

  # GET LIST OF AMOUNTS
  path('otheringredientamounts/', OtherIngredientAmountListView.as_view()),
  path('eoamounts/', EssentialOilAmountListView.as_view()),
  path('boamounts/', BaseOilAmountListView.as_view()),
]