import tempfile
from PIL import Image
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from .models import Projeto, SecaoProjeto


def gerar_imagem_teste():
    arquivo = tempfile.NamedTemporaryFile(suffix=".png")
    img = Image.new("RGB", (10, 10), color="blue")
    img.save(arquivo, format="PNG")
    arquivo.seek(0)
    return SimpleUploadedFile(name="capa.png", content=arquivo.read(), content_type="image/png")


class ProjetoAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = User.objects.create_superuser("admin_projetos", "admin@teste.com", "pass123")

        self.projeto_ativo = Projeto.objects.create(
            titulo="Projeto Saúde e Vida",
            slug="projeto-saude-e-vida",
            categorias="saude,acolhimento",
            categoria_label="Saúde & Nutrição",
            resumo_impacto="Atendimento Médico",
            texto_botao="Conhecer",
            mes_ano="Ativo",
            imagem=gerar_imagem_teste(),
            descricao="Resumo do projeto de saúde.",
            tagline_modal='"Cuidar da saúde é salvar vidas."',
            descricao_modal="Descrição longa e detalhada do projeto.",
            ordem=1,
            ativo=True,
        )
        self.secao1 = SecaoProjeto.objects.create(
            projeto=self.projeto_ativo,
            titulo="Objetivo Geral",
            conteudo="Apoiar pessoas em tratamento.",
            ordem=1,
        )
        self.secao2 = SecaoProjeto.objects.create(
            projeto=self.projeto_ativo,
            titulo="Como Ajudar",
            conteudo="- Doações financeiras\n- Voluntariado\n- Divulgação",
            ordem=2,
        )

        self.projeto_inativo = Projeto.objects.create(
            titulo="Projeto Inativo",
            slug="projeto-inativo",
            categorias="saude",
            categoria_label="Saúde",
            resumo_impacto="Rascunho",
            imagem=gerar_imagem_teste(),
            descricao="Projeto ainda não divulgado.",
            ordem=2,
            ativo=False,
        )

    def test_listar_projetos_publico_retorna_apenas_ativos(self):
        url = "/api/projetos/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        data = response.data if isinstance(response.data, list) else response.data.get("results", [])
        self.assertEqual(len(data), 1)
        projeto = data[0]
        self.assertEqual(projeto["title"], "Projeto Saúde e Vida")
        self.assertEqual(projeto["category"], ["saude", "acolhimento"])
        self.assertEqual(projeto["modal"]["tagline"], '"Cuidar da saúde é salvar vidas."')
        self.assertEqual(len(projeto["modal"]["sections"]), 2)

        # Verifica formatação das seções do modal
        secao_topicos = projeto["modal"]["sections"][1]
        self.assertEqual(secao_topicos["heading"], "Como Ajudar")
        self.assertIsInstance(secao_topicos["content"], list)
        self.assertEqual(len(secao_topicos["content"]), 3)

    def test_visitante_nao_pode_criar_projeto(self):
        url = "/api/projetos/"
        dados = {
            "titulo": "Novo Projeto",
            "slug": "novo-projeto",
            "categoria_label": "Geral",
            "resumo_impacto": "Impacto",
            "descricao": "Desc",
            "imagem": gerar_imagem_teste(),
        }
        response = self.client.post(url, dados, format="multipart")
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_administrador_pode_criar_projeto(self):
        self.client.force_authenticate(user=self.admin)
        url = "/api/projetos/"
        dados = {
            "titulo": "Novo Projeto Criado pelo CMS",
            "slug": "novo-projeto-cms",
            "categoria_label": "Autoestima Feminina",
            "resumo_impacto": "Novo Destaque",
            "descricao": "Descrição curta do projeto criado no CMS.",
            "imagem": gerar_imagem_teste(),
        }
        response = self.client.post(url, dados, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Projeto.objects.count(), 3)
