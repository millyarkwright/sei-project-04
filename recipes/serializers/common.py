from rest_framework import serializers
from ..models import Recipe, OtherIngredient, OtherIngredientAmount, EssentialOilAmount, BaseOilAmount
from applications.serializers.common import ApplicationSerializer
from remedies.serializers.common import RemedySerializer

# ! RECIPE SERIALIZER ------------
class RecipeSerializer(serializers.ModelSerializer):
  applications = ApplicationSerializer(many=True)
  remedies = RemedySerializer(many=True)
  
  class Meta:
    model = Recipe
    fields = "__all__"

class CreateRecipeSerializer(serializers.ModelSerializer):

  class Meta:
    model = Recipe
    fields = "__all__"
    
# SHORT RECIPE SERIALIZER -------------
class RecipeIndexSerializer(serializers.ModelSerializer):
  applications = ApplicationSerializer(many=True)
  remedies = RemedySerializer(many=True)
  # applications = serializers.SlugRelatedField(
  # many=True,
  # read_only=True,
  # slug_field="name"
  # )
  # remedies = serializers.SlugRelatedField(
  # many=True,
  # read_only=True,
  # slug_field="name"
  # )
  class Meta:
      model = Recipe
      fields = ('id', 'name', 'description', 'applications', 'remedies')

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
    fields = ( 'id', 'other_ingredient', 'quantity', 'measurement')

# ESSENTIAL OIL AMOUNT-------------
class EssentialOilAmountSerializer(serializers.ModelSerializer):
  # essential_oil = serializers.SlugRelatedField(
  #   read_only=True,
  #   slug_field="name"
  # )

  class Meta:
    model = EssentialOilAmount
    fields = ('id', 'essential_oil', 'quantity', 'measurement')

#BASE OIL AMOUNT-----------
class BaseOilAmountSerializer(serializers.ModelSerializer):
  # base_oil = serializers.SlugRelatedField(
  #   read_only=True,
  #   slug_field="name"
  # )
  class Meta:
    model = BaseOilAmount
    fields = ('id', 'base_oil',  'quantity', 'measurement')