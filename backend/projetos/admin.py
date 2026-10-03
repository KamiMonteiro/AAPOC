from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin, StackedInline
from unfold.decorators import display
from .models import Projeto, SecaoProjeto


class SecaoProjetoInline(StackedInline):
    model = SecaoProjeto
    extra = 1
    fields = [("titulo", "ordem"), "conteudo"]
    ordering = ["ordem"]
    verbose_name = "Seção do Modal"
    verbose_name_plural = "Seções Informativas do Modal (Objetivos, Justificativa, Como Ajudar, etc.)"


@admin.register(Projeto)
class ProjetoAdmin(ModelAdmin):
    list_display = [
        "preview_miniatura",
        "titulo",
        "categoria_label",
        "resumo_impacto",
        "ordem",
        "status_ativo",
        "atualizado_em",
    ]
    list_filter = ["ativo", "categoria_label", "criado_em"]
    search_fields = ["titulo", "descricao", "resumo_impacto", "categoria_label"]
    list_editable = ["ordem"]
    prepopulated_fields = {"slug": ("titulo",)}
    readonly_fields = ["id", "preview_grande", "criado_em", "atualizado_em"]
    inlines = [SecaoProjetoInline]

    fieldsets = [
        (
            "Identificação do Projeto",
            {
                "description": "Informações fundamentais para identificação e ordenação no site.",
                "fields": (
                    ("titulo", "slug"),
                    ("categorias", "categoria_label"),
                    ("resumo_impacto", "mes_ano"),
                    ("texto_botao", "ordem", "ativo"),
                ),
            },
        ),
        (
            "Capa e Imagem",
            {
                "description": "Selecione a imagem ou banner representativo do projeto.",
                "fields": (
                    "imagem",
                    "preview_grande",
                    "alt_imagem",
                ),
            },
        ),
        (
            "Resumo e Apresentação no Site",
            {
                "fields": (
                    "descricao",
                ),
            },
        ),
        (
            "Configurações do Modal de Detalhes",
            {
                "description": "Textos em destaque ao abrir o modal com informações completas.",
                "fields": (
                    "tagline_modal",
                    "descricao_modal",
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

    @display(description="Capa")
    def preview_miniatura(self, obj):
        if obj.imagem:
            return format_html(
                '<img src="{}" style="height: 48px; width: 72px; object-fit: cover; border-radius: 8px; border: 1px solid #e5e7eb; box-shadow: 0 1px 2px rgba(0,0,0,0.05);" />',
                obj.imagem.url,
            )
        return "Sem foto"

    @display(description="Pré-visualização da Capa")
    def preview_grande(self, obj):
        if obj.imagem:
            return format_html(
                '<div style="margin-top: 8px;"><img src="{}" style="max-height: 240px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);" /></div>',
                obj.imagem.url,
            )
        return "Nenhuma imagem de capa enviada até o momento."

    @display(
        description="Visível no Site",
        boolean=True,
    )
    def status_ativo(self, obj):
        return obj.ativo
