from rest_framework import serializers
from ..models import EoBenefit

class EoBenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = EoBenefit
        fields = "__all__"