from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin
from unfold.decorators import display
from .models import FotoGaleria


@admin.register(FotoGaleria)
class FotoGaleriaAdmin(ModelAdmin):
    list_display = [
        "preview_miniatura",
        "titulo",
        "data_evento",
        "ordem",
        "status_ativo",
        "criado_em",
    ]
    list_filter = ["ativo", "data_evento", "criado_em"]
    search_fields = ["titulo", "descricao"]
    list_editable = ["ordem"]
    date_hierarchy = "data_evento"
    readonly_fields = ["id", "preview_grande", "criado_em", "atualizado_em"]

    fieldsets = [
        (
            "Mídia e Legenda",
            {
                "description": "Selecione o arquivo de imagem e descreva a ação ou evento.",
                "fields": (
                    "titulo",
                    "imagem",
                    "preview_grande",
                    "descricao",
                ),
            },
        ),
        (
            "Configurações de Exibição",
            {
                "fields": (
                    "data_evento",
                    "link_instagram",
                    ("ordem", "ativo"),
                ),
            },
        ),
        (
            "Auditoria",
            {
                "classes": ("collapse",),
                "fields": ("id", "criado_em", "atualizado_em"),
            },
        ),
    ]

    @display(description="Foto")
    def preview_miniatura(self, obj):
        if obj.imagem:
            return format_html(
                '<img src="{}" style="height: 48px; width: 48px; object-fit: cover; border-radius: 8px; border: 1px solid #e5e7eb; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" />',
                obj.imagem.url,
            )
        return "Sem foto"

    @display(description="Pré-visualização Atual")
    def preview_grande(self, obj):
        if obj.imagem:
            return format_html(
                '<div style="margin-top: 8px;"><img src="{}" style="max-height: 240px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);" /></div>',
                obj.imagem.url,
            )
        return "Nenhuma imagem carregada até o momento."

    @display(
        description="Visível no Site",
        boolean=True,
    )
    def status_ativo(self, obj):
        return obj.ativo
