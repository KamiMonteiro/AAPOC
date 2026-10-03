from rest_framework import viewsets, permissions, filters
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import Projeto
from .serializers import ProjetoSerializer, ProjetoWriteSerializer


@extend_schema_view(
    list=extend_schema(
        summary="Listar projetos ativos (Público)",
        description="Retorna a lista completa de iniciativas e projetos da AAPOC para o site institucional.",
    ),
    retrieve=extend_schema(
        summary="Visualizar detalhes de um projeto específico",
        description="Retorna as informações completas e seções informativas do modal do projeto.",
    ),
)
class ProjetoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para exibição pública e gestão completa dos Projetos da AAPOC.
    """
    queryset = Projeto.objects.prefetch_related("secoes").all()
    serializer_class = ProjetoSerializer
    pagination_class = None
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["titulo", "descricao", "categoria_label", "resumo_impacto"]
    ordering_fields = ["ordem", "criado_em", "titulo"]
    ordering = ["ordem", "-criado_em"]
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return ProjetoWriteSerializer
        return ProjetoSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def get_queryset(self):
        # Visitantes públicos só enxergam projetos ativos
        if self.request.user and self.request.user.is_staff:
            return Projeto.objects.prefetch_related("secoes").all()
        return Projeto.objects.filter(ativo=True).prefetch_related("secoes")
