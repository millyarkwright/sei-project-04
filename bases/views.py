from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import BaseOil
from .serializers.common import BaseOilSerializer
from .serializers.populated import PopulatedBaseOilSerializer

# Create your views here.

# ! Get All Base Oils

class BaseOilListView(APIView):

  def get(self, _request):
    base_oils = BaseOil.objects.all()
    print('BOs->', base_oils)
    serialized_base_oils = PopulatedBaseOilSerializer(base_oils, many=True)
    print('Serialized EOs ->', serialized_base_oils)
    return Response(serialized_base_oils.data, status=status.HTTP_200_OK)