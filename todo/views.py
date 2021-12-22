from rest_framework import viewsets
from rest_framework.pagination import LimitOffsetPagination

from .models import Project, Todo
from .serializers import ProjectSerializer, TodoSerializer
from .filters import ProjectFilter, ToDoByProjectNDatetimeFilter


class ProjectLimitOffsetPaginator(LimitOffsetPagination):
    default_limit = 10


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('id')
    serializer_class = ProjectSerializer
    pagination_class = ProjectLimitOffsetPaginator
    filterset_class = ProjectFilter


class ToDoLimitOffsetPaginator(LimitOffsetPagination):
    default_limit = 20


class ToDoNoDelViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('id')
    serializer_class = TodoSerializer
    pagination_class = ToDoLimitOffsetPaginator
    filterset_class = ToDoByProjectNDatetimeFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

    # @action(methods=['GET'], detail=True)
    # def get_project_name(self, request, pk=None):
    #     project = Project.objects.get(pk=pk)
    #     return Response({'name': str(project)})

# class ProjectModelViewSet(ModelViewSet):
#     queryset = Project.objects.all()
#     serializer_class = ProjectSerializer

# class TodoModelViewSet(ModelViewSet):
#     queryset = ToDdo.objects.all()
#     serializer_class = TodoSerializer
