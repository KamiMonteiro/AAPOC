import re
import uuid
from datetime import date
from django.db import models
from django.core.exceptions import ValidationError


class Voluntario(models.Model):
    class Status(models.TextChoices):
        PENDENTE = "PENDENTE", "Pendente"
        EM_CONTATO = "EM_CONTATO", "Em Contato"
        APROVADO = "APROVADO", "Aprovado"
        RECUSADO = "RECUSADO", "Recusado"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nome_completo = models.CharField(max_length=150, verbose_name="Nome Completo")
    data_nascimento = models.DateField(verbose_name="Data de Nascimento")
    telefone = models.CharField(max_length=20, verbose_name="Telefone / WhatsApp")
    instagram = models.CharField(max_length=60, blank=True, verbose_name="Instagram")
    endereco = models.CharField(max_length=255, verbose_name="Endereço")
    como_deseja_ajudar = models.TextField(verbose_name="Como Deseja Ajudar")
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDENTE,
        verbose_name="Status da Inscrição",
    )
    observacoes_internas = models.TextField(
        blank=True,
        verbose_name="Observações Internas (Uso Exclusivo da AAPOC)",
        help_text="Anotações da equipe sobre entrevistas, disponibilidade ou histórico.",
    )
    termo_lgpd_aceito = models.BooleanField(
        default=True,
        verbose_name="Aceite do Termo de Privacidade (LGPD)",
        help_text="Indica que o voluntário autorizou o armazenamento de seus dados para contato da AAPOC.",
    )
    criado_em = models.DateTimeField(auto_now_add=True, verbose_name="Data de Inscrição")
    atualizado_em = models.DateTimeField(auto_now=True, verbose_name="Última Atualização")

    class Meta:
        verbose_name = "Voluntário"
        verbose_name_plural = "Voluntários"
        ordering = ["-criado_em"]

    def __str__(self):
        return f"{self.nome_completo} — {self.get_status_display()}"

    @property
    def idade(self) -> int:
        hoje = date.today()
        return (
            hoje.year
            - self.data_nascimento.year
            - ((hoje.month, hoje.day) < (self.data_nascimento.month, self.data_nascimento.day))
        )

    @property
    def link_whatsapp(self) -> str:
        digitos = re.sub(r"\D", "", self.telefone)
        if len(digitos) in (10, 11):
            if not digitos.startswith("55"):
                digitos = f"55{digitos}"
        return f"https://wa.me/{digitos}"

    def clean(self):
        super().clean()
        if self.data_nascimento:
            if self.idade < 16:
                raise ValidationError(
                    {"data_nascimento": "O candidato deve possuir no mínimo 16 anos completos."}
                )
            if self.idade > 100:
                raise ValidationError(
                    {"data_nascimento": "Data de nascimento inválida."}
                )
