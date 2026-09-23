import tempfile
from PIL import Image
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, override_settings
from rest_framework import status
from rest_framework.test import APIClient
from .models import FotoGaleria


def gerar_imagem_teste():
    """Gera uma imagem simples de 10x10 px em memória para testes."""
    arquivo = tempfile.NamedTemporaryFile(suffix=".jpg")
    img = Image.new("RGB", (10, 10), color="pink")
    img.save(arquivo, format="JPEG")
    arquivo.seek(0)
    return SimpleUploadedFile(
        name="teste.jpg", content=arquivo.read(), content_type="image/jpeg"
    )


class FotoGaleriaAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = User.objects.create_superuser("admin_galeria", "admin@teste.com", "pass123")

        self.foto_ativa = FotoGaleria.objects.create(
            titulo="Foto Evento Outubro Rosa",
            imagem=gerar_imagem_teste(),
            ativo=True,
            ordem=1,
        )
        self.foto_inativa = FotoGaleria.objects.create(
            titulo="Foto Rascunho Não Publicada",
            imagem=gerar_imagem_teste(),
            ativo=False,
            ordem=2,
        )

    def test_listar_fotos_publico_retorna_apenas_ativas(self):
        url = "/api/galeria/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # DRF retorna paginado por padrão { count: 1, results: [...] }
        results = response.data.get("results", response.data)
        self.assertEqual(len(results), 1)
        self.assertEqual(results[0]["titulo"], "Foto Evento Outubro Rosa")

    def test_upload_requer_administrador(self):
        url = "/api/galeria/"
        nova_foto = {
            "titulo": "Nova Foto",
            "imagem": gerar_imagem_teste(),
        }
        # Usuário anônimo deve ser negado (401/403)
        response = self.client.post(url, nova_foto, format="multipart")
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_administrador_pode_fazer_upload(self):
        self.client.force_authenticate(user=self.admin)
        url = "/api/galeria/"
        nova_foto = {
            "titulo": "Nova Foto Admin",
            "imagem": gerar_imagem_teste(),
        }
        response = self.client.post(url, nova_foto, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(FotoGaleria.objects.count(), 3)
