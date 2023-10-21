from rest_framework import serializers
from .models import user
from django.contrib.auth.hashers import make_password

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ('id', 'username','password', 'email', 'date_joined', 'is_active','verified')

    def create(self, validated_data):
        """
        Create and return a new User instance, given the validated data.
        """
        # Hash the password before saving it
        validated_data['password'] = make_password(validated_data['password'])
        return user.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing User instance, given the validated data.
        """
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        if 'password' in validated_data:
            instance.password = make_password(validated_data['password'])
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.verified = validated_data.get('verified', instance.verified)
        instance.save()
        return instance
