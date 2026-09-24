import os
import django

# Inicializa o ambiente do Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

# Usuários padrão para provisionamento automático em produção
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
        print(f"Superusuário '{conta['username']}' criado com sucesso!")
    else:
        # Garante que a senha configurada funcione
        usuario.set_password(conta["password"])
        usuario.is_staff = True
        usuario.is_superuser = True
        usuario.save()
        print(f"Superusuário '{conta['username']}' atualizado com sucesso!")
