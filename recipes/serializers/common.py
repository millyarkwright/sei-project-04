from rest_framework import serializers
from ..models import Recipe, OtherIngredient, OtherIngredientAmount, EssentialOilAmount, BaseOilAmount

# ! RECIPE SERIALIZER ------------
class RecipeSerializer(serializers.ModelSerializer):
  applications = serializers.SlugRelatedField(
  many=True,
  read_only=True,
  slug_field="name"
  )
  remedies = serializers.SlugRelatedField(
  many=True,
  read_only=True,
  slug_field="name"
  )

  class Meta:
    model = Recipe
    fields = "__all__"

# ! OTHER INGREDIENT SERIALIZER ------------
class OtherIngredientSerializer(serializers.ModelSerializer):
  class Meta:
    model = OtherIngredient
    fields = "__all__"

# ! AMOUNT TABLES SERIALIZER ------------

# OTHER INGREDIENT AMOUNT -----------
class OtherIngredientAmountSerializer(serializers.ModelSerializer):
  other_ingredient = serializers.SlugRelatedField(
    read_only=True,
    slug_field="name"
  )

  class Meta:
    model = OtherIngredientAmount
    fields = ('amount', 'id', 'other_ingredient')

# ESSENTIAL OIL AMOUNT-------------
class EssentialOilAmountSerializer(serializers.ModelSerializer):
  essential_oil = serializers.SlugRelatedField(
    read_only=True,
    slug_field="name"
  )

  class Meta:
    model = EssentialOilAmount
    fields = ('amount', 'id', 'essential_oil')

#BASE OIL AMOUNT-----------
class BaseOilAmountSerializer(serializers.ModelSerializer):
  base_oil = serializers.SlugRelatedField(
    read_only=True,
    slug_field="name"
  )
  class Meta:
    model = BaseOilAmount
    fields = ('amount', 'id', 'base_oil')