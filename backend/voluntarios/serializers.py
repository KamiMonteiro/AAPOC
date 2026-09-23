import re
from datetime import date
from rest_framework import serializers
from .models import Voluntario


def validar_idade(data_nascimento: date) -> int:
    hoje = date.today()
    idade = (
        hoje.year
        - data_nascimento.year
        - ((hoje.month, hoje.day) < (data_nascimento.month, data_nascimento.day))
    )
    if idade < 16:
        raise serializers.ValidationError("O voluntário deve ter no mínimo 16 anos completos.")
    if idade > 100:
        raise serializers.ValidationError("Por favor, insira uma data de nascimento válida.")
    return idade


class VoluntarioPublicCreateSerializer(serializers.ModelSerializer):
    """
    Serializer para envio público a partir da Landing Page da AAPOC.
    Expõe apenas os campos que o voluntário deve preencher e valida termos de LGPD.
    """

    class Meta:
        model = Voluntario
        fields = [
            "id",
            "nome_completo",
            "data_nascimento",
            "telefone",
            "instagram",
            "endereco",
            "como_deseja_ajudar",
            "termo_lgpd_aceito",
            "criado_em",
        ]
        read_only_fields = ["id", "criado_em"]

    def validate_nome_completo(self, value: str) -> str:
        partes = [p for p in value.strip().split(" ") if p]
        if len(partes) < 2:
            raise serializers.ValidationError("Por favor, informe seu nome completo (nome e sobrenome).")
        return " ".join(partes)

    def validate_data_nascimento(self, value: date) -> date:
        validar_idade(value)
        return value

    def validate_telefone(self, value: str) -> str:
        digitos = re.sub(r"\D", "", value)
        if len(digitos) < 10 or len(digitos) > 11:
            raise serializers.ValidationError(
                "Informe um telefone válido com DDD (10 ou 11 dígitos numéricos)."
            )
        return value.strip()

    def validate_instagram(self, value: str) -> str:
        clean = value.strip()
        if clean and not clean.startswith("@"):
            clean = f"@{clean}"
        return clean

    def validate_termo_lgpd_aceito(self, value: bool) -> bool:
        if not value:
            raise serializers.ValidationError(
                "É necessário concordar com os termos de privacidade para realizar o cadastro."
            )
        return value


class VoluntarioAdminSerializer(serializers.ModelSerializer):
    """
    Serializer completo com campos administrativos e propriedades computadas
    para uso exclusivo da coordenação da AAPOC.
    """
    idade = serializers.IntegerField(read_only=True)
    link_whatsapp = serializers.CharField(read_only=True)

    class Meta:
        model = Voluntario
        fields = [
            "id",
            "nome_completo",
            "data_nascimento",
            "idade",
            "telefone",
            "link_whatsapp",
            "instagram",
            "endereco",
            "como_deseja_ajudar",
            "status",
            "observacoes_internas",
            "termo_lgpd_aceito",
            "criado_em",
            "atualizado_em",
        ]
        read_only_fields = ["id", "criado_em", "atualizado_em"]
