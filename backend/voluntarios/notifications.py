import json
import logging
import os
import urllib.request
from django.conf import settings
from django.core.mail import send_mail

logger = logging.getLogger(__name__)


def formatar_mensagem_notificacao(voluntario) -> str:
    """
    Formata o texto de notificação para WhatsApp e e-mail.
    """
    return (
        f"🔔 *Nova Inscrição de Voluntário — AAPOC MT*\n\n"
        f"👤 *Nome:* {voluntario.nome_completo}\n"
        f"🎂 *Idade:* {voluntario.idade} anos\n"
        f"📱 *Telefone:* {voluntario.telefone}\n"
        f"🤝 *Como deseja ajudar:*\n{voluntario.como_deseja_ajudar}\n\n"
        f"👉 *Clique para chamar no WhatsApp:*\n{voluntario.link_whatsapp}"
    )


def enviar_whatsapp_webhook(mensagem: str, telefone_destino: str, webhook_url: str):
    """
    Dispara webhook para envio de mensagem no WhatsApp.
    Compatível com Evolution API, Z-API, n8n, Make ou Webhooks personalizados.
    """
    payload = {
        "number": telefone_destino,
        "phone": telefone_destino,
        "message": mensagem,
        "text": mensagem,
    }
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        webhook_url,
        data=data,
        headers={
            "Content-Type": "application/json",
            "User-Agent": "AAPOC-Backend-Notifier/1.0",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=4) as response:
        logger.info(f"[Notificação WhatsApp] Resposta do webhook: status {response.status}")


def notificar_coordenacao_novo_voluntario(voluntario):
    """
    Notifica a equipe da AAPOC sobre uma nova inscrição recebida pelo site.
    Suporta:
    1. WhatsApp via Webhook/API (configurável via WHATSAPP_NOTIFICATION_WEBHOOK_URL)
    2. E-mail de alerta (configurável via EMAIL_NOTIFICACAO_DESTINO)
    """
    mensagem = formatar_mensagem_notificacao(voluntario)
    webhook_url = os.getenv("WHATSAPP_NOTIFICATION_WEBHOOK_URL", "").strip()
    telefone_destino = os.getenv("WHATSAPP_COORDINATION_PHONE", "5565992162284").strip()
    email_destino = os.getenv("EMAIL_NOTIFICACAO_DESTINO", "").strip()

    # 1. Envio para WhatsApp se configurado
    if webhook_url:
        try:
            enviar_whatsapp_webhook(mensagem, telefone_destino, webhook_url)
            logger.info(f"[Notificação WhatsApp] Notificação enviada para {telefone_destino} via webhook.")
        except Exception as e:
            logger.warning(f"[Notificação WhatsApp] Não foi possível enviar WhatsApp: {e}")
    else:
        logger.info(
            f"[Notificação WhatsApp] Webhook não configurado. Mensagem gerada:\n{mensagem}"
        )

    # 2. Envio de E-mail se configurado
    if email_destino:
        try:
            send_mail(
                subject=f"Novo Voluntário Cadastrado: {voluntario.nome_completo}",
                message=mensagem.replace("*", ""),  # Remove formatação markdown para texto puro
                from_email=settings.DEFAULT_FROM_EMAIL if hasattr(settings, "DEFAULT_FROM_EMAIL") else None,
                recipient_list=[email_destino],
                fail_silently=True,
            )
            logger.info(f"[Notificação E-mail] Alerta enviado para {email_destino}.")
        except Exception as e:
            logger.warning(f"[Notificação E-mail] Falha no envio de e-mail: {e}")
