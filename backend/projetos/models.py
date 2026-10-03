import uuid
from django.db import models


class Projeto(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    titulo = models.CharField(max_length=150, verbose_name="Título do Projeto")
    slug = models.SlugField(max_length=160, unique=True, verbose_name="Identificador (Slug)")
    categorias = models.CharField(
        max_length=100,
        default="acolhimento",
        verbose_name="Categorias (separadas por vírgula)",
        help_text="Categorias válidas: acolhimento, saude, autoestima, empoderamento (ex: 'acolhimento,saude')",
    )
    categoria_label = models.CharField(
        max_length=100,
        verbose_name="Rótulo da Categoria Principal",
        help_text="Ex: 'Saúde & Dignidade', 'Acolhimento & Moradia', 'Autoestima Feminina'",
    )
    resumo_impacto = models.CharField(
        max_length=120,
        verbose_name="Destaque de Impacto",
        help_text="Frase de destaque no topo do card (ex: '+37.000 Caldos Entregues', 'Hospedagem 100% Gratuita')",
    )
    texto_botao = models.CharField(
        max_length=60,
        default="Conhecer Projeto",
        verbose_name="Texto do Botão (CTA)",
        help_text="Ex: 'Doar Bolsas / Insumos', 'Apoiar a Casa de Apoio', 'Solicitar Palestra'",
    )
    mes_ano = models.CharField(
        max_length=60,
        default="Ação Permanente",
        verbose_name="Status / Período",
        help_text="Ex: 'Projeto 2026', 'Desde Jan/2026', 'Projeto Ativo', 'Encontro Mensal'",
    )
    imagem = models.ImageField(
        upload_to="projetos/%Y/%m/",
        verbose_name="Imagem de Capa do Projeto",
        help_text="Foto ou banner ilustrativo do projeto.",
    )
    alt_imagem = models.CharField(
        max_length=200,
        blank=True,
        verbose_name="Texto Alternativo da Imagem",
        help_text="Descrição curta para acessibilidade e leitores de tela.",
    )
    descricao = models.TextField(
        verbose_name="Descrição Resumida (Card)",
        help_text="Texto curto de apresentação exibido na grade do site.",
    )
    tagline_modal = models.CharField(
        max_length=255,
        blank=True,
        verbose_name="Frase de Efeito no Modal (Tagline)",
        help_text="Citação ou lema em destaque (ex: 'A dignidade começa no cuidado.')",
    )
    descricao_modal = models.TextField(
        blank=True,
        verbose_name="Descrição Completa no Modal",
        help_text="Texto introdutório ao abrir o modal com detalhes do projeto.",
    )
    ordem = models.PositiveIntegerField(
        default=0,
        verbose_name="Ordem de Prioridade",
        help_text="Números menores aparecem primeiro (0 tem prioridade máxima).",
    )
    ativo = models.BooleanField(
        default=True,
        verbose_name="Exibir no Site",
        help_text="Desmarque para ocultar o projeto sem excluí-lo.",
    )
    criado_em = models.DateTimeField(auto_now_add=True, verbose_name="Data de Criação")
    atualizado_em = models.DateTimeField(auto_now=True, verbose_name="Última Atualização")

    class Meta:
        verbose_name = "Projeto"
        verbose_name_plural = "Projetos e Ações"
        ordering = ["ordem", "-criado_em"]

    def __str__(self):
        return self.titulo

    @property
    def lista_categorias(self):
        return [c.strip() for c in self.categorias.split(",") if c.strip()]


class SecaoProjeto(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    projeto = models.ForeignKey(
        Projeto,
        on_delete=models.CASCADE,
        related_name="secoes",
        verbose_name="Projeto",
    )
    titulo = models.CharField(
        max_length=150,
        verbose_name="Título da Seção",
        help_text="Ex: 'Objetivo Geral', 'Objetivos Específicos', 'Como Ajudar', 'Impacto Social'",
    )
    conteudo = models.TextField(
        verbose_name="Conteúdo da Seção",
        help_text="Texto ou lista de tópicos. Se quiser tópicos com marcadores, coloque cada item em uma nova linha.",
    )
    ordem = models.PositiveIntegerField(
        default=0,
        verbose_name="Ordem de Exibição no Modal",
        help_text="Ordem em que esta seção aparece dentro do modal.",
    )

    class Meta:
        verbose_name = "Seção Informativa do Modal"
        verbose_name_plural = "Seções Informativas do Modal"
        ordering = ["ordem"]

    def __str__(self):
        return f"{self.projeto.titulo} — {self.titulo}"
