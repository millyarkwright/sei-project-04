from rest_framework import serializers
from ..models import Essential, EoUse, EoBenefit, KeyAction

class EssentialSerializer(serializers.ModelSerializer):
  class Meta:
    model = Essential
    fields = "__all__"

class EoUseSerializer(serializers.ModelSerializer):
  class Meta:
    model = EoUse
    fields = "__all__"

class EoBenefitSerializer(serializers.ModelSerializer):
  class Meta:
    model = EoBenefit
    fields = "__all__"

class KeyActionSerializer(serializers.ModelSerializer):
  class Meta:
    model = KeyAction
    fields = "__all__"