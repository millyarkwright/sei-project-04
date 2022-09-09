from django.urls import path 
from .views import RecipeListView, OtherIngredientListView, OtherIngredientAmountListView, EssentialOilAmountListView, BaseOilAmountListView

urlpatterns = [
  path('', RecipeListView.as_view()),
  path('otheringredients/', OtherIngredientListView.as_view()),
  path('otheringredientamounts/', OtherIngredientAmountListView.as_view()),
  path('eoamounts/', EssentialOilAmountListView.as_view()),
  path('boamounts/', BaseOilAmountListView.as_view()),
]