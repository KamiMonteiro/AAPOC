from datetime import date, timedelta
from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from .models import Voluntario


class VoluntarioAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(
            username="admin_test", email="admin@teste.com", password="password123"
        )
        self.dados_validos = {
            "nome_completo": "Maria Silva",
            "data_nascimento": "1995-05-15",
            "telefone": "(65) 99999-1234",
            "instagram": "@mariasilva",
            "endereco": "Rua das Flores, 123, Cuiabá - MT",
            "como_deseja_ajudar": "Gostaria de ajudar na triagem e acolhimento dos pacientes.",
            "termo_lgpd_aceito": True,
        }

    def test_criar_voluntario_com_sucesso(self):
        url = "/api/voluntarios/"
        response = self.client.post(url, self.dados_validos, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data.get("success"))
        self.assertEqual(Voluntario.objects.count(), 1)

        voluntario = Voluntario.objects.first()
        self.assertEqual(voluntario.nome_completo, "Maria Silva")
        self.assertEqual(voluntario.status, Voluntario.Status.PENDENTE)

    def test_bloquear_menor_de_16_anos(self):
        dados_menor = self.dados_validos.copy()
        hoje = date.today()
        dados_menor["data_nascimento"] = (hoje - timedelta(days=365 * 14)).strftime("%Y-%m-%d")

        url = "/api/voluntarios/"
        response = self.client.post(url, dados_menor, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("data_nascimento", response.data)

    def test_bloquear_sem_aceite_lgpd(self):
        dados_sem_lgpd = self.dados_validos.copy()
        dados_sem_lgpd["termo_lgpd_aceito"] = False

        url = "/api/voluntarios/"
        response = self.client.post(url, dados_sem_lgpd, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("termo_lgpd_aceito", response.data)

    def test_usuario_anonimo_nao_pode_listar_voluntarios(self):
        Voluntario.objects.create(
            nome_completo="João Teste",
            data_nascimento="1990-01-01",
            telefone="65988887777",
            endereco="Cuiabá",
            como_deseja_ajudar="Logística",
        )
        url = "/api/voluntarios/"
        response = self.client.get(url)
        # Anônimo não tem permissão para listar
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])

    def test_administrador_pode_listar_voluntarios(self):
        Voluntario.objects.create(
            nome_completo="João Teste",
            data_nascimento="1990-01-01",
            telefone="65988887777",
            endereco="Cuiabá",
            como_deseja_ajudar="Logística",
        )
        self.client.force_authenticate(user=self.admin_user)
        url = "/api/voluntarios/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data.get("results", [])), 1)
