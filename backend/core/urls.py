"""
URL configuration for core project.
AAPOC - Associação de Apoio aos Pacientes Oncológicos de Cuiabá
"""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from rest_framework.routers import DefaultRouter
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from voluntarios.views import VoluntarioViewSet
from galeria.views import FotoGaleriaViewSet
from projetos.views import ProjetoViewSet

# Router para os endpoints da API REST
router = DefaultRouter()
router.register(r"voluntarios", VoluntarioViewSet, basename="voluntario")
router.register(r"galeria", FotoGaleriaViewSet, basename="galeria")
router.register(r"projetos", ProjetoViewSet, basename="projeto")

def setup_admin(request):
    from django.http import JsonResponse
    if request.GET.get("key") != "aapoc2026":
        return JsonResponse({"error": "Unauthorized"}, status=403)
    from django.contrib.auth import get_user_model
    from django.core.management import call_command
    User = get_user_model()
    resultados = []
    for username, email in [("admin", "admin@aapoc.org.br"), ("janaina", "contato@aapoc.org.br")]:
        u = User.objects.filter(username=username).first()
        if not u:
            User.objects.create_superuser(username=username, email=email, password="admin")
            resultados.append(f"{username} (criado)")
        else:
            u.set_password("admin")
            u.is_staff = True
            u.is_superuser = True
            u.save()
            resultados.append(f"{username} (atualizado)")

    try:
        call_command("popular_projetos")
        resultados.append("popular_projetos executado com sucesso")
    except Exception as e:
        resultados.append(f"erro projetos: {e}")

    try:
        call_command("popular_galeria")
        resultados.append("popular_galeria executado com sucesso")
    except Exception as e:
        resultados.append(f"erro galeria: {e}")

    return JsonResponse({"status": "ok", "actions": resultados})

urlpatterns = [
    # Redireciona a raiz diretamente para a tela de login do Painel Administrativo
    path("", RedirectView.as_view(url="/admin/", permanent=False), name="index-redirect"),

    # Painel Administrativo Nativo do Django
    path("admin/", admin.site.urls),
    
    # Endpoints da API REST
    path("api/", include(router.urls)),

    # Endpoint utilitário para provisionamento de administradores
    path("api/setup-admin/", setup_admin, name="setup-admin"),

    # Documentação Interativa da API (OpenAPI 3 / Swagger)
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]

# Servir arquivos de mídia (uploads) localmente em desenvolvimento
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
