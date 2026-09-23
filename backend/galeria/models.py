import uuid
from django.db import models
from django.utils import timezone


class FotoGaleria(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titulo = models.CharField(max_length=150, verbose_name="Título da Foto / Ação")
    imagem = models.ImageField(
        upload_to="galeria/%Y/%m/",
        verbose_name="Arquivo de Imagem",
        help_text="Formatos recomendados: JPG, PNG ou WEBP.",
    )
    descricao = models.TextField(
        blank=True,
        verbose_name="Descrição ou Legenda",
        help_text="Breve relato sobre a ação realizada ou os pacientes acolhidos.",
    )
    data_evento = models.DateField(
        default=timezone.localdate,
        verbose_name="Data do Evento",
    )
    link_instagram = models.URLField(
        blank=True,
        verbose_name="Link do Post no Instagram (Opcional)",
        help_text="Caso a foto tenha uma publicação no @aapocmt correspondente.",
    )
    ativo = models.BooleanField(
        default=True,
        verbose_name="Exibir no Site",
        help_text="Desmarque para ocultar a foto do site sem precisar excluí-la.",
    )
    ordem = models.PositiveIntegerField(
        default=0,
        verbose_name="Ordem de Prioridade",
        help_text="Números menores aparecem primeiro (0 tem prioridade máxima).",
    )
    criado_em = models.DateTimeField(auto_now_add=True, verbose_name="Data de Envio")
    atualizado_em = models.DateTimeField(auto_now=True, verbose_name="Última Atualização")

    class Meta:
        verbose_name = "Foto da Galeria"
        verbose_name_plural = "Galeria de Fotos"
        ordering = ["ordem", "-data_evento", "-criado_em"]

    def __str__(self):
        return self.titulo
