from .common import EssentialSerializer
from eo_benefits.serializers.common import EoBenefitSerializer
from eo_uses.serializers.common import EoUseSerializer

class PopulatedEssentialSerializer(EssentialSerializer):
    benefits = EoBenefitSerializer(many=True)
    uses = EoUseSerializer(many=True)

