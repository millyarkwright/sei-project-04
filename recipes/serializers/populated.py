from .common import RecipeSerializer, OtherIngredientSerializer, OtherIngredientAmountSerializer

class PopulatedOtherIngredientSerializer(OtherIngredientSerializer):
    amount = OtherIngredientAmountSerializer(many=True)

class PopulatedRecipeSerializer(RecipeSerializer):
    other_ingredient_amount = OtherIngredientAmountSerializer(many=True)

