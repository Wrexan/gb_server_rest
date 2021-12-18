from django.db import models
from django.utils import timezone


class Project(models.Model):
    name = models.CharField(max_length=64, verbose_name='название')
    repo_link = models.FilePathField(max_length=256, verbose_name='путь к репозиторию')
    involved_users = models.ManyToManyField(blank=True,
                                            help_text='Список участников проекта',
                                            related_name='user_set',
                                            related_query_name='user',
                                            to='usersapp.User',
                                            verbose_name='участники')
    is_active = models.BooleanField(verbose_name='активен', default=True)


class Todo(models.Model):
    name = models.CharField(max_length=64, verbose_name='название')
    task = models.TextField(max_length=256, verbose_name='текст')
    related_project = models.ForeignKey(to='todo.Project',
                                        on_delete=models.CASCADE(),
                                        related_name='в проекте')
    author = models.ForeignKey(to='usersapp.User',
                               on_delete=models.SET('удален'),
                               related_name='автор')
    repo_link = models.FilePathField(max_length=256, verbose_name='путь к репозиторию')
    date_created = models.DateTimeField(default=timezone.now, verbose_name='дата создания')
    date_updated = models.DateTimeField(default=timezone.now, verbose_name='дата изменения')
    is_active = models.BooleanField(verbose_name='активно', default=True)
