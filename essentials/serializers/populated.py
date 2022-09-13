from .common import EssentialSerializer, EoUseSerializer, EoBenefitSerializer


class PopulatedEssentialSerializer(EssentialSerializer):
    blends_well_with = EssentialSerializer(many=True)
    benefits = EoBenefitSerializer(many=True)
    uses = EoUseSerializer(many=True)

