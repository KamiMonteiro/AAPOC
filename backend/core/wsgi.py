"""
WSGI config for core project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = get_wsgi_application()

# Provisionamento automático de administradores no boot do servidor
try:
    from django.contrib.auth import get_user_model
    User = get_user_model()
    contas = [
        ("admin", "admin@aapoc.org.br"),
        ("janaina", "contato@aapoc.org.br"),
    ]
    for username, email in contas:
        u = User.objects.filter(username=username).first()
        if not u:
            User.objects.create_superuser(username=username, email=email, password="admin")
            print(f"[WSGI Startup] Superusuário '{username}' criado com sucesso.")
        else:
            u.set_password("admin")
            u.is_staff = True
            u.is_superuser = True
            u.save()
            print(f"[WSGI Startup] Superusuário '{username}' atualizado com sucesso.")

    from django.core.management import call_command
    from projetos.models import Projeto
    from galeria.models import FotoGaleria

    if Projeto.objects.count() == 0:
        call_command("popular_projetos")
        print("[WSGI Startup] Projetos iniciais povoados com sucesso.")

    if FotoGaleria.objects.count() == 0:
        call_command("popular_galeria")
        print("[WSGI Startup] Fotos da galeria povoadas com sucesso.")
except Exception as e:
    print(f"[WSGI Startup] Aviso: {e}")

