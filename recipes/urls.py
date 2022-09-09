from django.urls import path 
from .views import RecipeListView, OtherIngredientListView, OtherIngredientAmountListView

urlpatterns = [
  path('', RecipeListView.as_view()),
  path('otheringredients', OtherIngredientListView.as_view()),
  path('otheringredientamounts', OtherIngredientAmountListView.as_view())

]