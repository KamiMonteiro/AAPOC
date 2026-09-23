from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin
from unfold.decorators import display
from .models import Voluntario


@admin.register(Voluntario)
class VoluntarioAdmin(ModelAdmin):
    list_display = [
        "nome_completo",
        "status_colorido",
        "idade_calculada",
        "telefone",
        "botao_whatsapp",
        "criado_em",
    ]
    list_filter = ["status", "termo_lgpd_aceito", "criado_em"]
    search_fields = ["nome_completo", "telefone", "instagram", "endereco"]
    date_hierarchy = "criado_em"
    readonly_fields = ["id", "idade_calculada", "botao_whatsapp", "criado_em", "atualizado_em"]

    fieldsets = [
        (
            "Identificação e Contato",
            {
                "fields": (
                    "nome_completo",
                    "data_nascimento",
                    "idade_calculada",
                    ("telefone", "botao_whatsapp"),
                    "instagram",
                    "endereco",
                )
            },
        ),
        (
            "Atuação Voluntária",
            {
                "fields": ("como_deseja_ajudar",),
            },
        ),
        (
            "Gestão e Triagem da AAPOC",
            {
                "description": "Controle interno da diretoria e voluntários coordenadores.",
                "fields": ("status", "observacoes_internas"),
            },
        ),
        (
            "Auditoria e Conformidade (LGPD)",
            {
                "classes": ("collapse",),
                "fields": ("id", "termo_lgpd_aceito", "criado_em", "atualizado_em"),
            },
        ),
    ]

    @display(
        description="Status",
        label={
            Voluntario.Status.PENDENTE: "info",
            Voluntario.Status.EM_CONTATO: "warning",
            Voluntario.Status.APROVADO: "success",
            Voluntario.Status.RECUSADO: "danger",
        },
    )
    def status_colorido(self, obj):
        return obj.status

    @display(description="Idade")
    def idade_calculada(self, obj):
        return f"{obj.idade} anos"

    @display(description="Contato")
    def botao_whatsapp(self, obj):
        return format_html(
            '<a href="{}" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-sm transition-colors">'
            '<span>💬</span> Chamar no WhatsApp'
            '</a>',
            obj.link_whatsapp,
        )
