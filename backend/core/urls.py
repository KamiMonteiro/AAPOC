"""
URL configuration for core project.
AAPOC - Associação de Apoio aos Pacientes Oncológicos de Cuiabá
"""

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

# Router para os endpoints da API REST
router = DefaultRouter()
router.register(r"voluntarios", VoluntarioViewSet, basename="voluntario")

urlpatterns = [
    # Redireciona a raiz para a documentação interativa
    path("", RedirectView.as_view(url="/api/docs/", permanent=False), name="index-redirect"),

    # Painel Administrativo Nativo do Django
    path("admin/", admin.site.urls),
    
    # Endpoints da API REST
    path("api/", include(router.urls)),

    # Documentação Interativa da API (OpenAPI 3 / Swagger)
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]
