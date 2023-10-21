from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from django.contrib.auth import authenticate, login
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




    




class GetToken(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        email = request.data['email']
        password = request.data['password']
        response = super(GetToken, self).post(request, *args, **kwargs)
        authuser = authenticate(request, email=email, password=password)
        if authuser is not None:
            login(request, authuser)
            if response.status_code == status.HTTP_200_OK:
                searcheduser = user.objects.get(email=request.data['email'])
                return Response({
                    'access': response.data['access'],
                    'refresh': response.data['refresh'],
                    'user_id': searcheduser.id,
                    'verification': searcheduser.verified,                
                })
            return response
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        