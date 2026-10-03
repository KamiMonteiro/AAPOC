from pathlib import Path
from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings
from projetos.models import Projeto, SecaoProjeto

PROJETOS_DATA = [
    {
        "titulo": "Cólon e Esperança",
        "slug": "colon-e-esperanca",
        "categorias": "saude,acolhimento",
        "categoria_label": "Saúde & Dignidade",
        "resumo_impacto": "Dignidade & Bolsas Gratuitas",
        "texto_botao": "Doar Bolsas / Insumos",
        "mes_ano": "Projeto 2026",
        "imagem_path": "frontend/src/assets/colon_projeto_2026.png",
        "alt_imagem": "Projeto Cólon e Esperança",
        "descricao": "Aquisição e doação de bolsas de colostomia para assistidos que necessitam de estomia. A dignidade começa no cuidado contínuo.",
        "tagline_modal": '"A dignidade começa no cuidado."',
        "descricao_modal": "A AAPOC - Associação de Apoio aos Pacientes Oncológicos de Cuiabá atua acolhendo pacientes e familiares que enfrentam diariamente os desafios do câncer. Entre as maiores dificuldades encontradas pelos pacientes ostomizados está o acesso contínuo às bolsas de colostomia, item essencial para a sobrevivência, higiene, mobilidade, autoestima e dignidade humana.",
        "ordem": 1,
        "secoes": [
            {
                "titulo": "Objetivo Geral",
                "conteudo": "Garantir dignidade, segurança e qualidade de vida aos pacientes oncológicos ostomizados através da arrecadação e distribuição gratuita de bolsas de colostomia.",
            },
            {
                "titulo": "Objetivos Específicos",
                "conteudo": "- Arrecadar bolsas de colostomia\n- Receber materiais auxiliares de higiene e proteção\n- Promover acolhimento humanizado\n- Reduzir riscos de infecções e complicações\n- Desenvolver campanhas de conscientização\n- Firmar parcerias com empresas, hospitais e instituições",
            },
            {
                "titulo": "Justificativa",
                "conteudo": "A bolsa de colostomia representa dignidade, autonomia e qualidade de vida. Sem acesso adequado às bolsas, muitos pacientes enfrentam sofrimento, isolamento social e extrema vulnerabilidade emocional. O projeto Cólon e Esperança busca devolver esperança e acolhimento aos pacientes que enfrentam a luta contra o câncer.",
            },
            {
                "titulo": "Como Ajudar",
                "conteudo": "- Doação de bolsas de colostomia\n- Doação de placas adesivas e pastas protetoras\n- Produtos de higiene pessoal\n- Pomadas e materiais auxiliares de estomia\n- Apoio financeiro para aquisição direta dos materiais",
            },
            {
                "titulo": "Público-Alvo",
                "conteudo": "Pacientes oncológicos ostomizados em situação de vulnerabilidade social atendidos pela AAPOC.",
            },
            {
                "titulo": "Impacto Social",
                "conteudo": "- Melhorar a qualidade de vida dos pacientes\n- Garantir mais dignidade no tratamento\n- Reduzir complicações de saúde\n- Fortalecer o acolhimento humanizado\n- Levar esperança para famílias em situação de vulnerabilidade",
            },
        ],
    },
    {
        "titulo": "Casa de Apoio",
        "slug": "casa-de-apoio",
        "categorias": "acolhimento",
        "categoria_label": "Acolhimento & Moradia",
        "resumo_impacto": "Hospedagem 100% Gratuita",
        "texto_botao": "Apoiar a Casa de Apoio",
        "mes_ano": "Desde Jan/2026",
        "imagem_path": "frontend/public/img/casa_apoio.jpeg",
        "alt_imagem": "Casa de Apoio Carmen Lúcia",
        "descricao": "Alojamento transitório gratuito para pacientes oncológicos de outros municípios de MT e seus acompanhantes durante o tratamento em Cuiabá.",
        "tagline_modal": '"Um lar longe de casa."',
        "descricao_modal": "A Casa de Apoio é uma infraestrutura de acolhimento transitório para pacientes oncológicos em trânsito. Permite que o paciente e um acompanhante durmam, façam refeições ou aguardem o transporte de volta para suas cidades de origem de forma 100% gratuita.",
        "ordem": 2,
        "secoes": [
            {
                "titulo": "Objetivo",
                "conteudo": "Oferecer alojamento transitório gratuito para pacientes oncológicos de outros municípios do interior de Mato Grosso e seus acompanhantes durante o período de tratamento em Cuiabá.",
            },
            {
                "titulo": "Como Funciona",
                "conteudo": "- Acolhimento de pacientes e acompanhantes vindos do interior do estado\n- Pernoite gratuito enquanto aguardam transporte e vans municipais\n- Alimentação e suporte durante a estadia\n- Ambiente humanizado, seguro e acolhedor",
            },
            {
                "titulo": "Público-Alvo",
                "conteudo": "Pacientes oncológicos de outros municípios de Mato Grosso e seus acompanhantes que precisam se deslocar até Cuiabá para tratamento no SUS.",
            },
            {
                "titulo": "Impacto Social",
                "conteudo": "- Eliminar a barreira geográfica no acesso ao tratamento oncológico\n- Zerar custos de hospedagem para famílias vulneráveis\n- Garantir que nenhum paciente abandone o tratamento por falta de onde ficar\n- Promover acolhimento humanizado fora do ambiente hospitalar",
            },
        ],
    },
    {
        "titulo": "Além da Renda",
        "slug": "alem-da-renda",
        "categorias": "autoestima",
        "categoria_label": "Autoestima Feminina",
        "resumo_impacto": "Próteses & Sutiãs Especiais",
        "texto_botao": "Doar Sutiãs / Próteses",
        "mes_ano": "Projeto Ativo",
        "imagem_path": "frontend/public/img/renda.jpg",
        "alt_imagem": "Projeto Além da Renda",
        "descricao": "Doação de sutiãs com próteses acopladas para mulheres assistidas que passaram por mastectomia, devolvendo conforto e autoestima.",
        "tagline_modal": '"Devolver a autoestima é também cuidar da cura."',
        "descricao_modal": "Projeto focado em mulheres que passaram por mastectomia. Realiza a doação de sutiãs com próteses acopladas, devolvendo conforto, autoestima e dignidade às assistidas.",
        "ordem": 3,
        "secoes": [
            {
                "titulo": "Objetivo",
                "conteudo": "Apoiar mulheres mastectomizadas assistidas pela AAPOC com doação de sutiãs com próteses acopladas, promovendo bem-estar físico e emocional.",
            },
            {
                "titulo": "Histórico",
                "conteudo": "Anteriormente o projeto também doava próteses de silicone, mas a demanda foi absorvida pelo SUS após a sanção de uma nova lei que garante a cobertura integral do valor da prótese.",
            },
            {
                "titulo": "Público-Alvo",
                "conteudo": "Mulheres assistidas pela AAPOC que passaram por mastectomia.",
            },
            {
                "titulo": "Como Ajudar",
                "conteudo": "- Doação de sutiãs com próteses acopladas\n- Doação de sutiãs pós-cirúrgicos\n- Apoio financeiro para aquisição dos itens\n- Divulgação do projeto para ampliar o alcance",
            },
            {
                "titulo": "Impacto Social",
                "conteudo": "- Recuperar a autoestima e a imagem corporal das pacientes\n- Reduzir o sofrimento emocional pós-mastectomia\n- Facilitar a reinserção social das assistidas\n- Garantir conforto físico durante e após o tratamento",
            },
        ],
    },
    {
        "titulo": "Informação Salva-Vidas",
        "slug": "informacao-salva-vidas",
        "categorias": "empoderamento",
        "categoria_label": "Educação & Prevenção",
        "resumo_impacto": "Palestras em Empresas & Escolas",
        "texto_botao": "Solicitar Palestra",
        "mes_ano": "Projeto Ativo",
        "imagem_path": "frontend/public/img/salva_vidas.jpeg",
        "alt_imagem": "Projeto Informação Salva-Vidas",
        "descricao": "Palestras de conscientização sobre prevenção do câncer em empresas e escolas, com distribuição de materiais e testemunhos reais.",
        "tagline_modal": '"Ter câncer não é o fim, mas sim o começo de uma nova história."',
        "descricao_modal": "Iniciativa educacional que leva conscientização sobre prevenção do câncer a empresas, escolas e instituições. O serviço é gratuito, porém aberto a doações conforme a vontade do parceiro.",
        "ordem": 4,
        "secoes": [
            {
                "titulo": "Objetivo",
                "conteudo": "Disseminar informação de qualidade sobre prevenção e enfrentamento do câncer, reduzindo o medo e promovendo diagnóstico precoce na sociedade.",
            },
            {
                "titulo": "Atividades",
                "conteudo": "- Distribuição de panfletos informativos sobre todos os tipos de câncer\n- Palestras ministradas pela coordenação e voluntárias da AAPOC\n- Testemunhos reais de vivência e superação da doença\n- Ações em empresas, escolas e instituições parceiras",
            },
            {
                "titulo": "Público-Alvo",
                "conteudo": "Empresas, escolas, instituições e sociedade em geral.",
            },
            {
                "titulo": "Como Participar",
                "conteudo": "- Convidar a AAPOC para realizar uma palestra em sua empresa ou escola\n- Realizar doações voluntárias após as ações\n- Compartilhar o material informativo com sua rede de contatos\n- Tornar-se parceiro institucional do projeto",
            },
        ],
    },
    {
        "titulo": "Bem-Estar APOC",
        "slug": "bem-estar-apoc",
        "categorias": "saude",
        "categoria_label": "Saúde & Especialistas",
        "resumo_impacto": "Rede de Especialistas Voluntários",
        "texto_botao": "Ser Profissional Parceiro",
        "mes_ano": "Projeto Ativo",
        "imagem_path": "frontend/public/img/bem_estar.jpg",
        "alt_imagem": "Projeto Bem-Estar APOC",
        "descricao": "Rede de parceiros voluntários (dentistas, psicólogos, nutricionistas, fisioterapeutas) e empresas que oferecem atendimentos e descontos aos assistidos.",
        "tagline_modal": '"Cuidado integral para quem mais precisa."',
        "descricao_modal": "O Bem-Estar APOC consolida uma ampla rede de parceiros que oferecem atendimento especializado e descontos para os assistidos da AAPOC, garantindo acesso a serviços essenciais durante o tratamento.",
        "ordem": 5,
        "secoes": [
            {
                "titulo": "Objetivo",
                "conteudo": "Construir e manter uma rede de parceiros voluntários e empresas que ofereçam atendimento especializado e condições diferenciadas aos pacientes assistidos pela AAPOC.",
            },
            {
                "titulo": "Profissionais Voluntários e Parceiros",
                "conteudo": "- Dentistas\n- Nutricionistas\n- Advogados\n- Fisioterapeutas oncológicos\n- Psicólogos\n- Terapeutas de constelação familiar",
            },
            {
                "titulo": "Empresas Parceiras",
                "conteudo": "- Laboratórios de análises clínicas\n- Farmácias de manipulação\n- Óticas e clínicas parceiras",
            },
            {
                "titulo": "Público-Alvo",
                "conteudo": "Pacientes oncológicos e familiares assistidos pela AAPOC.",
            },
            {
                "titulo": "Como se Tornar Parceiro",
                "conteudo": "- Profissionais da saúde: oferecer consultas ou sessões voluntárias\n- Empresas e clínicas: conceder descontos especiais aos assistidos\n- Laboratórios: apoiar com exames a preços acessíveis\n- Entre em contato pelo WhatsApp da AAPOC",
            },
        ],
    },
    {
        "titulo": "Amor que Alimenta e Aquece",
        "slug": "amor-que-alimenta-e-aquece",
        "categorias": "saude,acolhimento",
        "categoria_label": "Nutrição Hospitalar",
        "resumo_impacto": "+37.000 Caldos Entregues",
        "texto_botao": "Doar Alimentos para os Caldos",
        "mes_ano": "Desde 2022",
        "imagem_path": "frontend/public/img/caldos.jpeg",
        "alt_imagem": "Amor que Alimenta e Aquece",
        "descricao": "Mais de 37.000 caldos nutritivos entregues a pacientes em tratamento no ITC/Cuiabá. Preparados semanalmente por voluntárias dedicadas.",
        "tagline_modal": '"Alimentar o corpo, aquecer a alma."',
        "descricao_modal": "Desde 2022, o projeto Amor que Alimenta e Aquece prepara e distribui caldos nutritivos aos pacientes oncológicos e acompanhantes no ITC (Instituto de Tratamento do Câncer), em Cuiabá. Já são mais de 37.000 caldos servidos.",
        "ordem": 6,
        "secoes": [
            {
                "titulo": "Objetivo",
                "conteudo": "Garantir nutrição reconfortante e acolhimento humanizado para pacientes que aguardam consultas, quimioterapia e radioterapia no hospital.",
            },
            {
                "titulo": "Como Funciona",
                "conteudo": "- Preparação artesanal de caldos ricos em nutrientes por equipe de voluntárias\n- Entrega semanal gratuita no hospital durante as sessões de tratamento\n- Momentos de conversa, afeto e suporte aos pacientes e acompanhantes",
            },
            {
                "titulo": "Como Ajudar",
                "conteudo": "- Doação de legumes frescos e proteínas (frango, carne)\n- Doação de embalagens descartáveis térmicas com tampa\n- Voluntariado no preparo e entrega dos caldos\n- Apoio financeiro para custos de gás e insumos",
            },
            {
                "titulo": "Impacto Social",
                "conteudo": "- Mais de 37.000 refeições quentes e nutritivas entregues\n- Alívio físico durante longas horas de espera hospitalar\n- Fortalecimento emocional do paciente e de sua rede de apoio",
            },
        ],
    },
    {
        "titulo": "Dia A (Dia APOC)",
        "slug": "dia-a-dia-apoc",
        "categorias": "acolhimento,empoderamento",
        "categoria_label": "Encontro Comunitário",
        "resumo_impacto": "Encontro Mensal & Sacolões",
        "texto_botao": "Apoiar o Próximo Dia A",
        "mes_ano": "Encontro Mensal",
        "imagem_path": "frontend/public/img/dia_a.jpeg",
        "alt_imagem": "Dia A - Dia APOC",
        "descricao": "Reunião mensal no último sábado do mês com palestras temáticas, distribuição de sacolões de alimentos, suplementação e feira de apoio.",
        "tagline_modal": '"Um sábado por mês para renovar a esperança."',
        "descricao_modal": "O Dia A é o grande encontro mensal da família AAPOC. Acontece todo último sábado de cada mês, reunindo pacientes, familiares e voluntários para momentos de celebração, aprendizado, entrega de benefícios e confraternização.",
        "ordem": 7,
        "secoes": [
            {
                "titulo": "Objetivo",
                "conteudo": "Proporcionar um dia de acolhimento integral, nutrição, orientação e celebração da vida para todos os assistidos cadastrados na associação.",
            },
            {
                "titulo": "Como Funciona a Ação",
                "conteudo": "- Café da manhã comunitário e acolhimento musical\n- Palestras com especialistas sobre saúde, direitos e bem-estar\n- Distribuição de sacolões de alimentos e suplementos nutricionais\n- Entrega de medicamentos e materiais de cuidados especiais\n- Feira com roupas, calçados e artesanatos doados",
            },
            {
                "titulo": "Itens de Maior Necessidade",
                "conteudo": "- Alimentos não perecíveis para compor os sacolões\n- Suplementos alimentares hipercalóricos e hiperproteicos\n- Fórmulas especiais para pacientes em sonda\n- Produtos de higiene pessoal",
            },
            {
                "titulo": "Público-Alvo",
                "conteudo": "Pacientes oncológicos cadastrados e seus familiares em Cuiabá e região metropolitana.",
            },
            {
                "titulo": "Como Participar",
                "conteudo": "- Doar alimentos e suplementos antes do último sábado do mês\n- Ser voluntário no suporte e organização do evento\n- Ministrar palestras voluntárias de orientação",
            },
        ],
    },
    {
        "titulo": "Banco de Lenços e Perucas",
        "slug": "banco-de-lencos-e-perucas",
        "categorias": "autoestima",
        "categoria_label": "Autoestima & Cuidado",
        "resumo_impacto": "Maior Banco de MT (~200 Perucas)",
        "texto_botao": "Doar Perucas / Cabelo",
        "mes_ano": "Projeto Ativo",
        "imagem_path": "frontend/public/img/perucas.jpeg",
        "alt_imagem": "Banco de Lenços e Perucas",
        "descricao": "Maior banco de perucas de cabelos naturais de MT. Empréstimo gratuito de perucas e doação de lenços para pacientes com queda capilar.",
        "tagline_modal": '"A beleza que vem de dentro e floresce por fora."',
        "descricao_modal": "A queda de cabelo durante o tratamento quimioterápico afeta profundamente a autoimagem do paciente. O Banco de Lenços e Perucas da AAPOC disponibiliza gratuitamente perucas higienizadas e lenços estilizados com orientações de amarração.",
        "ordem": 8,
        "secoes": [
            {
                "titulo": "Objetivo",
                "conteudo": "Resgatar a autoconfiança e a feminilidade de pacientes oncológicas através do acesso gratuito a perucas confeccionadas e lenços personalizados.",
            },
            {
                "titulo": "Como Funciona",
                "conteudo": "- Acervo de mais de 200 perucas naturais e sintéticas de diversos modelos e cores\n- Higienização e manutenção periódica realizada por profissionais parceiros\n- Empréstimo gratuito durante todo o período de tratamento\n- Oficinas e tutoriais de amarração criativa de lenços",
            },
            {
                "titulo": "Como Ajudar / Como Doar",
                "conteudo": "- Doação de cabelos a partir de 15 cm de comprimento\n- Doação de perucas novas ou seminovas em bom estado\n- Doação de lenços, turbantes, toucas e tiaras\n- Apoio para custear a tecelagem profissional das perucas",
            },
            {
                "titulo": "Critérios para Doação de Cabelo",
                "conteudo": "- Mínimo de 15 cm de comprimento\n- Cabelo limpo e totalmente seco\n- Amarrado firmemente com elástico antes do corte\n- Aceita-se cabelos com química ou tingidos",
            },
            {
                "titulo": "Público-Alvo",
                "conteudo": "Mulheres e crianças em tratamento oncológico com alopecia induzida por quimioterapia.",
            },
            {
                "titulo": "Impacto Social",
                "conteudo": "- Fortalecimento do amor-próprio e da identidade pessoal\n- Diminuição da ansiedade associada à perda do cabelo\n- Estímulo positivo e renovação da força para vencer o tratamento",
            },
        ],
    },
    {
        "titulo": "Empodera Elas",
        "slug": "empodera-elas",
        "categorias": "empoderamento",
        "categoria_label": "Empreendedorismo",
        "resumo_impacto": "100% da Renda para Assistidas",
        "texto_botao": "Conhecer Empreendedoras",
        "mes_ano": "Feira Ativa",
        "imagem_path": "frontend/public/img/empodera.jpeg",
        "alt_imagem": "Empodera Elas",
        "descricao": "Feira de geração de renda exclusiva para pacientes oncológicas assistidas. A AAPOC não retém taxas: 100% do lucro vai para as mulheres.",
        "tagline_modal": '"Mulheres que curam, criam e transformam."',
        "descricao_modal": "O diagnóstico de câncer frequentemente resulta em afastamento ou demissão do trabalho, agravando a vulnerabilidade financeira das famílias. O projeto Empodera Elas estimula a autonomia econômica através de oficinas de capacitação e realização de feiras.",
        "ordem": 9,
        "secoes": [
            {
                "titulo": "Objetivo",
                "conteudo": "Fomentar a independência financeira e o empreendedorismo entre mulheres assistidas pela AAPOC através do artesanato, culinária e serviços.",
            },
            {
                "titulo": "O Que É a Feira",
                "conteudo": "- Espaço gratuito concedido na sede da AAPOC e em eventos parceiros\n- Exposição e comercialização de doces, salgados, costura criativa e artesanatos\n- A AAPOC não cobra nenhuma comissão: 100% da venda fica com a paciente",
            },
            {
                "titulo": "Como Funciona",
                "conteudo": "- Oficinas de capacitação técnica em artesanato e precificação\n- Doação de matérias-primas e insumos para produção\n- Divulgação institucional dos produtos nas redes sociais da associação",
            },
            {
                "titulo": "Por Que Apoiar",
                "conteudo": "Comprar de uma empreendedora assistida é financiar diretamente o sustento de quem está em tratamento contra o câncer.",
            },
            {
                "titulo": "Público-Alvo",
                "conteudo": "Mulheres assistidas pela AAPOC que buscam fontes sustentáveis de renda para si e seus familiares.",
            },
            {
                "titulo": "Como Participar / Apoiar",
                "conteudo": "- Visitar as edições da feira e adquirir os produtos\n- Contratar as assistidas para encomendas corporativas de brindes e coffee breaks\n- Doar tecidos, linhas, máquinas de costura e insumos de culinária",
            },
        ],
    },
    {
        "titulo": "Lacre Solidário",
        "slug": "lacre-solidario",
        "categorias": "acolhimento,saude",
        "categoria_label": "Sustentabilidade & Nutrição",
        "resumo_impacto": "Conversão de Lacres em Proteínas",
        "texto_botao": "Juntar & Entregar Lacres",
        "mes_ano": "Campanha Contínua",
        "imagem_path": "frontend/public/img/lacre-solidario.jpeg",
        "alt_imagem": "Lacre Solidário",
        "descricao": "Arrecadação de lacres de alumínio convertidos em recursos para a compra de proteínas (carnes, ovos) servidas nas refeições da sede e da Casa de Apoio.",
        "tagline_modal": '"Pequenos gestos que enchem pratos de esperança."',
        "descricao_modal": "A campanha Lacre Solidário mobiliza a sociedade cuiabana na arrecadação de lacres de latinhas de alumínio. O montante coletado é vendido para reciclagem e os recursos são revertidos exclusivamente para compra de proteínas alimentares para os pacientes.",
        "ordem": 10,
        "secoes": [
            {
                "titulo": "Objetivo",
                "conteudo": "Promover a sustentabilidade ambiental ao mesmo tempo em que viabiliza recursos financeiros contínuos para a compra de proteínas para as refeições dos assistidos.",
            },
            {
                "titulo": "Como Funciona a Campanha",
                "conteudo": "- Arrecadação permanente de lacres de latinhas de alumínio\n- Pontos de coleta espalhados em escolas, condomínios e estabelecimentos parceiros\n- Venda direta do alumínio para reciclagem regulamentada\n- Compra de carnes, peixes, ovos e frangos para nutrição dos assistidos",
            },
            {
                "titulo": "Por Que Lacres?",
                "conteudo": "As doações convencionais geralmente suprem arroz, feijão e óleo, mas não cobrem proteínas animais. Os lacres permitem adquirir exatamente esses itens que fazem falta no dia a dia dos assistidos.",
            },
            {
                "titulo": "Destinação dos Recursos",
                "conteudo": "- Refeições servidas diariamente na sede (bazares e atendimentos)\n- Alimentação dos hóspedes da Casa de Apoio\n- Manutenção da sede e da Casa de Apoio",
            },
            {
                "titulo": "Como Participar",
                "conteudo": "- Guardar e entregar lacres de alumínio na AAPOC\n- Organizar pontos de coleta em empresas, condomínios e escolas\n- Indicar novos parceiros para a campanha\n- Divulgar nas redes sociais",
            },
        ],
    },
]


class Command(BaseCommand):
    help = "Popula o banco de dados com os 10 projetos institucionais completos da AAPOC e suas respectivas seções"

    def handle(self, *args, **options):
        base_dir = settings.BASE_DIR.parent

        self.stdout.write("Iniciando importação dos 10 projetos para o CMS da AAPOC...")

        for data in PROJETOS_DATA:
            slug = data["slug"]
            projeto, criado = Projeto.objects.get_or_create(
                slug=slug,
                defaults={
                    "titulo": data["titulo"],
                    "categorias": data["categorias"],
                    "categoria_label": data["categoria_label"],
                    "resumo_impacto": data["resumo_impacto"],
                    "texto_botao": data["texto_botao"],
                    "mes_ano": data["mes_ano"],
                    "alt_imagem": data["alt_imagem"],
                    "descricao": data["descricao"],
                    "tagline_modal": data["tagline_modal"],
                    "descricao_modal": data["descricao_modal"],
                    "ordem": data["ordem"],
                    "ativo": True,
                },
            )

            # Carrega a imagem se o projeto acabou de ser criado ou não possui imagem
            caminho_imagem = base_dir / data["imagem_path"]
            if caminho_imagem.exists() and not projeto.imagem:
                with open(caminho_imagem, "rb") as img_file:
                    projeto.imagem.save(caminho_imagem.name, File(img_file), save=True)

            # Cria ou atualiza as seções do modal
            if criado or projeto.secoes.count() == 0:
                for idx_secao, secao_data in enumerate(data["secoes"], start=1):
                    SecaoProjeto.objects.create(
                        projeto=projeto,
                        titulo=secao_data["titulo"],
                        conteudo=secao_data["conteudo"],
                        ordem=idx_secao,
                    )

            status = "criado" if criado else "já existente"
            self.stdout.write(f"- Projeto '{projeto.titulo}' ({status}) com {projeto.secoes.count()} seções.")

        self.stdout.write(
            self.style.SUCCESS("Todos os 10 projetos foram provisionados com sucesso no banco de dados!")
        )
