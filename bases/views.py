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

# ! Get Single Base Oil

class BaseOilDetailView(APIView):

  def get_essential(self, pk):
    try:
      return BaseOil.objects.get(pk=pk)
    except BaseOil.DoesNotExist:
      raise NotFound(detail='Base Oil not found')

  def get(self, _request, pk):
    base_oil = self.get_essential(pk=pk)
    print('BO->', base_oil)
    serialized_base_oil = PopulatedBaseOilSerializer(base_oil)
    print('serialised BO->', serialized_base_oil)
    return Response(serialized_base_oil.data, status=status.HTTP_200_OK)