from django.contrib import admin
from django.utils.html import format_html
from .models import Voluntario


@admin.register(Voluntario)
class VoluntarioAdmin(admin.ModelAdmin):
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

    @admin.display(description="Status")
    def status_colorido(self, obj):
        cores = {
            Voluntario.Status.PENDENTE: ("#2563eb", "#dbeafe"),      # Azul
            Voluntario.Status.EM_CONTATO: ("#d97706", "#fef3c7"),    # Âmbar
            Voluntario.Status.APROVADO: ("#16a34a", "#dcfce7"),      # Verde
            Voluntario.Status.RECUSADO: ("#dc2626", "#fee2e2"),      # Vermelho
        }
        cor_texto, cor_fundo = cores.get(obj.status, ("#4b5563", "#f3f4f6"))
        return format_html(
            '<span style="background-color: {}; color: {}; padding: 4px 10px; border-radius: 9999px; font-weight: bold; font-size: 11px;">{}</span>',
            cor_fundo,
            cor_texto,
            obj.get_status_display(),
        )

    @admin.display(description="Idade")
    def idade_calculada(self, obj):
        return f"{obj.idade} anos"

    @admin.display(description="Chamar no WhatsApp")
    def botao_whatsapp(self, obj):
        return format_html(
            '<a href="{}" target="_blank" style="background-color: #25D366; color: white; padding: 4px 10px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 12px; display: inline-flex; align-items: center; gap: 4px;">💬 WhatsApp</a>',
            obj.link_whatsapp,
        )
