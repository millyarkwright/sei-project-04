from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Essential
from .serializers.common import EssentialSerializer
from .serializers.populated import PopulatedEssentialSerializer

# Create your views here.

# ! Get All Essential Oils

class EssentialListView(APIView):

  def get(self, _request):
    essential_oils = Essential.objects.all()
    print('EOs->', essential_oils)
    serialized_essential_oils = PopulatedEssentialSerializer(essential_oils, many=True)
    print('Serialized EOs ->', serialized_essential_oils)
    return Response(serialized_essential_oils.data, status=status.HTTP_200_OK)