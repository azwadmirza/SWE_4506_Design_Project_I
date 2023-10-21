
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework import status
from gateway.models import user

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class Profile(APIView):
    def get(self, request):
        id = request.query_params.get('id')
        if id is None:
            return Response({'message': 'id parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            searcheduser = user.objects.filter(id=id).values().exclude(password=None).first()
            if searcheduser:
                response_data = {
                    'username': searcheduser['username'],
                    'email': searcheduser['email'],
                    'image': searcheduser['image']
                }
                return Response(response_data)
            else:
                return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except user.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)