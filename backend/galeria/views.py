from rest_framework import viewsets, permissions, filters
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import FotoGaleria
from .serializers import FotoGaleriaSerializer


@extend_schema_view(
    list=extend_schema(
        summary="Listar fotos da galeria (Público)",
        description="Retorna a lista de fotos de eventos e ações ativas para exibição no site da AAPOC.",
    ),
    retrieve=extend_schema(
        summary="Visualizar detalhes de uma foto da galeria",
    ),
)
class FotoGaleriaViewSet(viewsets.ModelViewSet):
    """
    ViewSet para exibição pública e gestão das fotos da Galeria da AAPOC.
    """
    queryset = FotoGaleria.objects.all()
    serializer_class = FotoGaleriaSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["titulo", "descricao"]
    ordering_fields = ["ordem", "data_evento", "criado_em"]
    ordering = ["ordem", "-data_evento", "-criado_em"]

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]

    def get_queryset(self):
        # Visitantes públicos só enxergam fotos ativas
        if self.request.user and self.request.user.is_staff:
            return FotoGaleria.objects.all()
        return FotoGaleria.objects.filter(ativo=True)
