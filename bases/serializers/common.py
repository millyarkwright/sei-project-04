from rest_framework import serializers
from ..models import BaseOil, BoBenefit

class BaseOilSerializer(serializers.ModelSerializer):
  class Meta:
    model = BaseOil
    fields = "__all__"

class BoBenefitSerializer(serializers.ModelSerializer):
  class Meta:
    model = BoBenefit
    fields = "__all__"