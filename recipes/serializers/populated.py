# Recipe Serializers:
from .common import RecipeSerializer, OtherIngredientSerializer, OtherIngredientAmountSerializer, EssentialOilAmountSerializer, BaseOilAmountSerializer
# Essential Oil Serializers:
from essentials.serializers.common import EssentialNameSerializer
# Base Serializers:
from bases.serializers.common import BaseOilNameSerializer
# Review Serializers:
from reviews.serializers.populated import PopulatedReviewSerializer
# User Serializers:
from jwt_auth.serializers.common import UserSerializer, UserMinSerializer


class PopulatedEssentialOilAmountSerializer(EssentialOilAmountSerializer):
    essential_oil = EssentialNameSerializer()

class PopulatedBaseOilAmountSerializer(BaseOilAmountSerializer):
    base_oil = BaseOilNameSerializer()

class PopulatedOtherIngredientAmountSerializer(OtherIngredientAmountSerializer):
    other_ingredient = OtherIngredientSerializer()

class PopulatedOtherIngredientSerializer(OtherIngredientSerializer):
    amount = OtherIngredientAmountSerializer(many=True)

class PopulatedRecipeSerializer(RecipeSerializer):
    other_ingredient_amount = PopulatedOtherIngredientAmountSerializer(many=True)
    # other_ingredient_amount = OtherIngredientAmountSerializer(many=True)
    # essential_oil_amount = EssentialOilAmountSerializer(many=True)
    essential_oil_amount = PopulatedEssentialOilAmountSerializer(many=True)
    base_oil_amount = PopulatedBaseOilAmountSerializer(many=True)
    reviews = PopulatedReviewSerializer(many=True)
    owner = UserMinSerializer()