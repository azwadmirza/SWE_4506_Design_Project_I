from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate, login
from random import randint
from django.core.mail import send_mail
from .models import user,otp
from .serializers import userSerializer  # Corrected import

class RegistrationView(APIView):
    permission_classes = []
    def post(self, request):
        serializer = userSerializer(data=request.data)  # Use the UserSerializer
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class VerifyEmail(APIView):
    permission_classes = []
    def get(self, request, *args, **kwargs):
        id = kwargs.get('id')
        searcheduser = user.objects.get(id=id)
        otp_code=randint(100000,999999)
        otp.objects.delete(email=searcheduser.email)
        otp.objects.create(email=searcheduser.email,otp=otp_code)
        send_mail(
            "Verify Your Email: DataAnalytica",
            "Your OTP is "+str(otp_code)+"\n\nRegards,\nDataAnalytica Team",
            "from@example.com",
            ["to@example.com"],
            fail_silently=False,
        )
        if searcheduser is not None:
            return Response({'otp':otp_code,'email':searcheduser.email},status=status.HTTP_200_OK)
        else:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
    def post(self, request):
        email = request.data['email']
        otp_code = request.data['otp']
        otp = otp.objects.filter(email=email,otp=otp_code).first()
        try:
            if otp is not None:
                searcheduser = user.objects.get(email=email)
                searcheduser.verified = True
                searcheduser.save()
                return Response({'message': 'Email verified successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'OTP is invalid'}, status=status.HTTP_401_UNAUTHORIZED)
        except user.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)   




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
        