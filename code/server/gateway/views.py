from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import user
from .serializers import userSerializer  # Corrected import

class RegistrationView(APIView):
    permission_classes = []
    def post(self, request):
        serializer = userSerializer(data=request.data)  # Use the UserSerializer
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
