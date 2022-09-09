from rest_framework import serializers
from ..models import Essential, EoUse, EoBenefit, KeyAction

class EssentialSerializer(serializers.ModelSerializer):
  key_action = serializers.SlugRelatedField(
  read_only=True,
  slug_field="name"
  )
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
  blends_well_with = serializers.SlugRelatedField(
  many=True,
  read_only=True,
  slug_field="name"
  )

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