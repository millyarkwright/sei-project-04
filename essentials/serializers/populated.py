from .common import EssentialSerializer, EoUseSerializer, EoBenefitSerializer


class PopulatedEssentialSerializer(EssentialSerializer):
    benefits = EoBenefitSerializer(many=True)
    uses = EoUseSerializer(many=True)

