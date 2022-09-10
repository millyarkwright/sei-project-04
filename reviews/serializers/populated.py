from .common import ReviewSerializer
from jwt_auth.serializers.common import UserSerializer, UserMinSerializer

# from .common import ReviewSerializer

class PopulatedReviewSerializer(ReviewSerializer):
  owner  = UserMinSerializer()
