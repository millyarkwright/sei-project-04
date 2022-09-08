from rest_framework import serializers
from ..models import Essential

class EssentialSerializer(serializers.ModelSerializer):
  class Meta:
    model = Essential
    fields = "__all__"