from rest_framework import serializers
from ..models import BaseOil, BoBenefit

class BaseOilSerializer(serializers.ModelSerializer):
  class Meta:
    model = BaseOil
    fields = "__all__"

class BaseOilNameSerializer(serializers.ModelSerializer):
  class Meta:
    model = BaseOil
    fields = ("name","id")

class BoBenefitSerializer(serializers.ModelSerializer):
  class Meta:
    model = BoBenefit
    fields = "__all__"