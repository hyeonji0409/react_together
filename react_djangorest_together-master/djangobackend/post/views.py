from django.shortcuts import render
from rest_framework.response import Response
# Create your views here.
from rest_framework import viewsets
from . import models
from . import serializers

class PostViewset(viewsets.ModelViewSet):
    queryset = models.Post.objects.all().order_by("-updated_at")
    serializer_class = serializers.PostSerializer

