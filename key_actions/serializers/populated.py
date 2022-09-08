from .common import KeyActionSerializer
from essentials.serializers.populated import PopulatedEssentialSerializer

class PopulatedKeyActionSerializer(KeyActionSerializer):
  essential_oils = PopulatedEssentialSerializer(many=True)