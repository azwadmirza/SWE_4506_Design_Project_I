from rest_framework import serializers
from .models import user

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('id', 'username','password', 'email', 'date_joined', 'is_active', 'is_staff')

    def create(self, validated_data):
        """
        Create and return a new User instance, given the validated data.
        """
        return user.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing User instance, given the validated data.
        """
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.password = validated_data.get('password', instance.password)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.is_staff = validated_data.get('is_staff', instance.is_staff)
        instance.save()
        return instance
