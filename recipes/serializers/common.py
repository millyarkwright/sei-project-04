from rest_framework import serializers
from ..models import Recipe, OtherIngredient, OtherIngredientAmount

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

class OtherIngredientSerializer(serializers.ModelSerializer):
  class Meta:
    model = OtherIngredient
    fields = "__all__"

class OtherIngredientAmountSerializer(serializers.ModelSerializer):
  other_ingredient = serializers.SlugRelatedField(
    read_only=True,
    slug_field="name"
    # queryset=OtherIngredient.objects.all()
  )

  class Meta:
    model = OtherIngredientAmount
    fields = ('amount', 'id', 'other_ingredient')
    # fields = "__all__"