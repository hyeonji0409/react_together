from rest_framework import serializers
from . import models

class PostSerializer(serializers.ModelSerializer):
    updated_at = serializers.DateTimeField(format="%Y/%m/%d %H:%M:%S", read_only=True)
    class Meta:
        model = models.Post
        fields = '__all__'