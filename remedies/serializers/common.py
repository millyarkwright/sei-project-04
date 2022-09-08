from rest_framework import serializers
from ..models import Remedy

class RemedySerializer(serializers.ModelSerializer):
  class Meta:
    model = Remedy
    fields = "__all__"