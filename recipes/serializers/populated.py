from .common import RecipeSerializer, OtherIngredientSerializer, OtherIngredientAmountSerializer, EssentialOilAmountSerializer, BaseOilAmountSerializer

class PopulatedOtherIngredientSerializer(OtherIngredientSerializer):
    amount = OtherIngredientAmountSerializer(many=True)

class PopulatedRecipeSerializer(RecipeSerializer):
    other_ingredient_amount = OtherIngredientAmountSerializer(many=True)
    essential_oil_amount = EssentialOilAmountSerializer(many=True)
    base_oil_amount = BaseOilAmountSerializer(many=True)
