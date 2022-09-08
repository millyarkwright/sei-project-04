from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Remedy
from .serializers.common import RemedySerializer


# Create your views here.

class RemedyListView(APIView):

  def get(self, _request):
    remedies = Remedy.objects.all()
    print('remedies->', remedies)
    serialized_remedies = RemedySerializer(remedies, many=True)
    print('serialized_remedies->', serialized_remedies)
    return Response(serialized_remedies.data, status=status.HTTP_200_OK)