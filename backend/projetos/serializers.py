from rest_framework import serializers
from .models import Projeto, SecaoProjeto


class SecaoProjetoSerializer(serializers.ModelSerializer):
    """
    Serializa as seções informativas do modal do projeto.
    Se o conteúdo tiver múltiplas linhas, divide em uma lista de tópicos.
    """
    heading = serializers.CharField(source="titulo")
    content = serializers.SerializerMethodField()

    class Meta:
        model = SecaoProjeto
        fields = ["heading", "content"]

    def get_content(self, obj):
        linhas = [
            linha.strip().lstrip("-*• ")
            for linha in obj.conteudo.strip().splitlines()
            if linha.strip()
        ]
        if len(linhas) > 1:
            return linhas
        elif len(linhas) == 1:
            if obj.conteudo.strip().startswith(("-", "*", "•")):
                return [linhas[0]]
            return linhas[0]
        return ""


class ProjetoSerializer(serializers.ModelSerializer):
    """
    Serializa os projetos com formato compatível com o componente React ProjectsGrid.
    """
    id = serializers.CharField()
    title = serializers.CharField(source="titulo")
    category = serializers.SerializerMethodField()
    categoryLabel = serializers.CharField(source="categoria_label")
    impactHighlight = serializers.CharField(source="resumo_impacto")
    ctaText = serializers.CharField(source="texto_botao")
    monthYear = serializers.CharField(source="mes_ano")
    image = serializers.SerializerMethodField()
    alt = serializers.CharField(source="alt_imagem")
    description = serializers.CharField(source="descricao")
    modal = serializers.SerializerMethodField()

    class Meta:
        model = Projeto
        fields = [
            "id",
            "slug",
            "title",
            "category",
            "categoryLabel",
            "impactHighlight",
            "ctaText",
            "monthYear",
            "image",
            "alt",
            "description",
            "modal",
            "ordem",
        ]

    def get_category(self, obj):
        return obj.lista_categorias

    def get_image(self, obj):
        if obj.imagem:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.imagem.url)
            return obj.imagem.url
        return ""

    def get_modal(self, obj):
        return {
            "tagline": obj.tagline_modal,
            "description": obj.descricao_modal,
            "sections": SecaoProjetoSerializer(obj.secoes.all(), many=True).data,
        }


class ProjetoWriteSerializer(serializers.ModelSerializer):
    """
    Serializer para criação e atualização de projetos pela API por administradores.
    """
    class Meta:
        model = Projeto
        fields = [
            "id",
            "titulo",
            "slug",
            "categorias",
            "categoria_label",
            "resumo_impacto",
            "texto_botao",
            "mes_ano",
            "imagem",
            "alt_imagem",
            "descricao",
            "tagline_modal",
            "descricao_modal",
            "ordem",
            "ativo",
        ]
        read_only_fields = ["id"]
