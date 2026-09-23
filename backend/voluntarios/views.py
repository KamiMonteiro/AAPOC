from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiParameter
from .models import Voluntario
from .serializers import (
    VoluntarioPublicCreateSerializer,
    VoluntarioAdminSerializer,
)
from .permissions import IsAdminOrAnonymousCreate


@extend_schema_view(
    list=extend_schema(
        summary="Listar voluntários cadastrados (Apenas Administradores)",
        description="Retorna a lista paginada de voluntários inscritos com status de triagem.",
    ),
    retrieve=extend_schema(
        summary="Visualizar detalhes de um voluntário (Apenas Administradores)",
        description="Retorna todas as informações do voluntário, incluindo notas internas da equipe.",
    ),
    create=extend_schema(
        summary="Enviar inscrição de voluntariado (Público)",
        description="Endpoint público utilizado pelo formulário do site para registrar um novo candidato a voluntário.",
        responses={201: VoluntarioPublicCreateSerializer},
    ),
    update=extend_schema(
        summary="Atualizar inscrição de voluntário (Apenas Administradores)",
        description="Permite que a coordenação altere o status da triagem e adicione observações internas.",
    ),
    partial_update=extend_schema(
        summary="Atualização parcial do voluntário (Apenas Administradores)",
    ),
    destroy=extend_schema(
        summary="Remover voluntário (Apenas Administradores)",
        description="Exclui o registro do voluntário (direito ao esquecimento / LGPD).",
    ),
)
class VoluntarioViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciar inscrições de voluntários da AAPOC.
    """
    queryset = Voluntario.objects.all()
    permission_classes = [IsAdminOrAnonymousCreate]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["nome_completo", "telefone", "instagram", "endereco"]
    ordering_fields = ["criado_em", "nome_completo", "status"]
    ordering = ["-criado_em"]

    def get_serializer_class(self):
        if self.request.user and self.request.user.is_staff:
            return VoluntarioAdminSerializer
        return VoluntarioPublicCreateSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        status_param = self.request.query_params.get("status")
        if status_param and self.request.user.is_staff:
            queryset = queryset.filter(status=status_param.upper())
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        voluntario = serializer.save()

        # Resposta amigável para o frontend
        return Response(
            {
                "success": True,
                "message": "Inscrição de voluntário recebida com sucesso! A equipe da AAPOC entrará em contato em breve.",
                "data": VoluntarioPublicCreateSerializer(voluntario).data,
            },
            status=status.HTTP_201_CREATED,
        )
