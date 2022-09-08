from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Key_action
from .serializers.common import KeyActionSerializer
from .serializers.populated import PopulatedKeyActionSerializer

# Create your views here.

# ! Get All Key Actions 

class KeyActionListView(APIView):

  def get(self, _request):
    key_actions = Key_action.objects.all()
    print('EOs->', key_actions)
    serialized_key_actions = PopulatedKeyActionSerializer(key_actions, many=True)
    print('Serialized EOs ->', serialized_key_actions)
    return Response(serialized_key_actions.data, status=status.HTTP_200_OK)