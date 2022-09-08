from rest_framework import serializers
from ..models import BaseOil

class BaseOilSerializer(serializers.ModelSerializer):
  class Meta:
    model = BaseOil
    fields = "__all__"