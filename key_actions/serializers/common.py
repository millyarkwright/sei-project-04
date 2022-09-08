from rest_framework import serializers
from ..models import Key_action

class KeyActionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Key_action
    fields = "__all__"