from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Application
from .serializers.common import ApplicationSerializer


# Create your views here.

# ! Get All Applications 

class ApplicationListView(APIView):

  def get(self, _request):
    applications = Application.objects.all()
    print('Applications', applications)
    serialized_applications = ApplicationSerializer(applications, many=True)
    print('Serialized Applications ->', serialized_applications)
    return Response(serialized_applications.data, status=status.HTTP_200_OK)