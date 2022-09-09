from .common import BaseOilSerializer, BoBenefitSerializer
# from bo_benefits.serializers.common import BoBenefitSerializer


class PopulatedBaseOilSerializer(BaseOilSerializer):
    benefits = BoBenefitSerializer(many=True)


