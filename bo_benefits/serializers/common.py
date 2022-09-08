from rest_framework import serializers
from ..models import BoBenefit

class BoBenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoBenefit
        fields = "__all__"