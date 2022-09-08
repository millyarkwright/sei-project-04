from rest_framework import serializers
from ..models import EoUse

class EoUseSerializer(serializers.ModelSerializer):
    class Meta:
        model = EoUse
        fields = "__all__"