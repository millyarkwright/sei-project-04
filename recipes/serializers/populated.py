from .common import RecipeSerializer, OtherIngredientSerializer, OtherIngredientAmountSerializer, EssentialOilAmountSerializer, BaseOilAmountSerializer
from essentials.serializers.common import EssentialNameSerializer
from bases.serializers.common import BaseOilNameSerializer

class PopulatedEssentialOilAmountSerializer(EssentialOilAmountSerializer):
    essential_oil = EssentialNameSerializer()

class PopulatedBaseOilAmountSerializer(BaseOilAmountSerializer):
    base_oil = BaseOilNameSerializer()

class PopulatedOtherIngredientSerializer(OtherIngredientSerializer):
    amount = OtherIngredientAmountSerializer(many=True)

class PopulatedRecipeSerializer(RecipeSerializer):
    other_ingredient_amount = OtherIngredientAmountSerializer(many=True)
    # essential_oil_amount = EssentialOilAmountSerializer(many=True)
    essential_oil_amount = PopulatedEssentialOilAmountSerializer(many=True)
    base_oil_amount = PopulatedBaseOilAmountSerializer(many=True)
