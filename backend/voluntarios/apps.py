from django.apps import AppConfig
from django.db.models.signals import post_migrate


def criar_superusuarios_padrao(sender, **kwargs):
    import os
    from django.contrib.auth import get_user_model
    User = get_user_model()

    contas = [
        {
            "username": os.getenv("DJANGO_SUPERUSER_USERNAME", "janaina"),
            "email": os.getenv("DJANGO_SUPERUSER_EMAIL", "contato@aapoc.org.br"),
            "password": os.getenv("DJANGO_SUPERUSER_PASSWORD", "admin"),
        },
        {
            "username": "admin",
            "email": "admin@aapoc.org.br",
            "password": "admin",
        },
    ]

    for conta in contas:
        usuario = User.objects.filter(username=conta["username"]).first()
        if not usuario:
            User.objects.create_superuser(
                username=conta["username"],
                email=conta["email"],
                password=conta["password"],
            )
            print(f"[AAPOC] Superusuário '{conta['username']}' criado com sucesso!")
        else:
            usuario.set_password(conta["password"])
            usuario.is_staff = True
            usuario.is_superuser = True
            usuario.save()
            print(f"[AAPOC] Superusuário '{conta['username']}' atualizado com sucesso!")


class VoluntariosConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'voluntarios'

    def ready(self):
        post_migrate.connect(criar_superusuarios_padrao, sender=self)
