from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Project, Todo
from usersapp.serializers import UserModelSerializer


class ProjectSerializer(ModelSerializer):
    involved_users = UserModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


# class ProjectCreateSerializer(ProjectSerializer):
#     involved_users = serializers.IntegerField


class TodoSerializer(ModelSerializer):
    related_project = ProjectSerializer()
    author = UserModelSerializer()

    class Meta:
        model = Todo
        fields = '__all__'


class TodoSerializerBase(ModelSerializer):
    related_project = ProjectSerializer()
    # author = UserModelSerializer()

    class Meta:
        model = Todo
        fields = '__all__'


# class TodoCreateSerializer(TodoSerializer):
#     related_project = serializers.PrimaryKeyRelatedField(),
#     required = True,
#     read_only = True
