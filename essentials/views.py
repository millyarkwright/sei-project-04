from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Essential, EoUse, KeyAction
from .serializers.common import EssentialSerializer, EoUseSerializer, KeyActionSerializer
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



class EssentialUsesListView(APIView): 
  
  def get(self, _request):
    essential_oil_uses = EoUse.objects.all()
    print('EOs uses->', essential_oil_uses)
    serialized_essential_oil_uses = EoUseSerializer(essential_oil_uses, many=True)
    print('Serialized EO uses ->', serialized_essential_oil_uses)
    return Response(serialized_essential_oil_uses.data, status=status.HTTP_200_OK)



class KeyActionListView(APIView):

  def get(self, _request):
    key_actions = KeyAction.objects.all()
    print('Keyactions->', key_actions)
    serialized_key_actions = KeyActionSerializer(key_actions, many=True)
    print('Serialised Keyactions ->', serialized_key_actions)
    return Response(serialized_key_actions.data, status=status.HTTP_200_OK)