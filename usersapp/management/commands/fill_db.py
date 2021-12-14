import json
import os

from django.core.management.base import BaseCommand

from usersapp.models import User

JSON_PATH = ''
JSON_NAME = 'dump_db'


def load_from_json(file_name):
    with open(os.path.join(JSON_PATH, file_name + '.json'), mode='r', encoding='utf8') as infile:
        return json.load(infile)


class Command(BaseCommand):
    def handle(self, *args, **options):
        admin_absent = True
        users_num = 0
        users = load_from_json(JSON_NAME)

        User.objects.all().delete()
        for user in users:
            # new_user = User(**user['fields'])
            new_user = User.objects.create_user(id=user['pk'],
                                                username=user['fields']['username'],
                                                first_name=user['fields']['first_name'],
                                                last_name=user['fields']['last_name'],
                                                email=user['fields']['email'],
                                                password='123',  # user['fields']['password'],
                                                is_superuser=user['fields']['is_superuser'],
                                                is_staff=user['fields']['is_staff'],
                                                is_active=user['fields']['is_active'],
                                                last_login=user['fields']['last_login'],
                                                date_joined=user['fields']['date_joined'],
                                                )
            new_user.groups.set(user['fields']['groups'])
            new_user.user_permissions.set(user['fields']['user_permissions'])
            if new_user.is_superuser: admin_absent = False
            new_user.save()
            users_num += 1
        print(f"Loaded users: {users_num}")

        # Admin.objects.all().delete()
        if admin_absent:
            super_user = User.objects.create_superuser('admin', 'x@x.x', '123')
            super_user.save()
            print("Super user created.")
