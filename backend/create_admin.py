import os
import sys
import django

# Inicializa o ambiente do Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

username = os.getenv("DJANGO_SUPERUSER_USERNAME", "").strip()
email = os.getenv("DJANGO_SUPERUSER_EMAIL", "").strip()
password = os.getenv("DJANGO_SUPERUSER_PASSWORD", "").strip()

if not username or not email or not password:
    print(
        "Erro: defina DJANGO_SUPERUSER_USERNAME, DJANGO_SUPERUSER_EMAIL e "
        "DJANGO_SUPERUSER_PASSWORD nas variáveis de ambiente antes de executar este script."
    )
    sys.exit(1)

if len(password) < 8:
    print("Erro: DJANGO_SUPERUSER_PASSWORD deve possuir no mínimo 8 caracteres.")
    sys.exit(1)

if User.objects.filter(username=username).exists():
    print(f"Superusuário '{username}' já existe. Nenhuma senha foi sobrescrita.")
else:
    User.objects.create_superuser(
        username=username,
        email=email,
        password=password,
    )
    print(f"Superusuário '{username}' criado com sucesso!")
