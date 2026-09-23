from rest_framework import serializers
from .models import FotoGaleria


class FotoGaleriaSerializer(serializers.ModelSerializer):
    """
    Serializer para consumo público das fotos da galeria no site da AAPOC.
    Retorna a URL completa da imagem para exibição no frontend.
    """
    imagem = serializers.ImageField(use_url=True)

    class Meta:
        model = FotoGaleria
        fields = [
            "id",
            "titulo",
            "imagem",
            "descricao",
            "data_evento",
            "link_instagram",
            "ordem",
            "criado_em",
        ]
        read_only_fields = ["id", "criado_em"]
