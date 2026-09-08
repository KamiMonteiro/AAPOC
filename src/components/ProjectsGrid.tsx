import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import colon from "@/assets/colon_projeto_2026.png";
import {
  Sparkles,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
  Heart,
  Home,
  Utensils,
  Smile,
  GraduationCap,
  Layers,
} from "lucide-react";

type ModalSection = {
  heading: string;
  content: string | string[];
};

type ProjectModal = {
  tagline: string;
  description: string;
  sections: ModalSection[];
};

export type ProjectCategory = "todos" | "acolhimento" | "saude" | "autoestima" | "empoderamento";

type Project = {
  title: string;
  category: ProjectCategory[];
  categoryLabel: string;
  impactHighlight: string;
  ctaText: string;
  monthYear: string;
  image: string;
  alt: string;
  description: string;
  modal: ProjectModal;
};

const colonModal: ProjectModal = {
  tagline: '"A dignidade começa no cuidado."',
  description:
    "A AAPOC - Associação de Apoio aos Pacientes Oncológicos de Cuiabá atua acolhendo pacientes e familiares que enfrentam diariamente os desafios do câncer. Entre as maiores dificuldades encontradas pelos pacientes ostomizados está o acesso contínuo às bolsas de colostomia, item essencial para a sobrevivência, higiene, mobilidade, autoestima e dignidade humana.",
  sections: [
    {
      heading: "Objetivo Geral",
      content:
        "Garantir dignidade, segurança e qualidade de vida aos pacientes oncológicos ostomizados através da arrecadação e distribuição gratuita de bolsas de colostomia.",
    },
    {
      heading: "Objetivos Específicos",
      content: [
        "Arrecadar bolsas de colostomia",
        "Receber materiais auxiliares de higiene e proteção",
        "Promover acolhimento humanizado",
        "Reduzir riscos de infecções e complicações",
        "Desenvolver campanhas de conscientização",
        "Firmar parcerias com empresas, hospitais e instituições",
      ],
    },
    {
      heading: "Justificativa",
      content:
        "A bolsa de colostomia representa dignidade, autonomia e qualidade de vida. Sem acesso adequado às bolsas, muitos pacientes enfrentam sofrimento, isolamento social e extrema vulnerabilidade emocional. O projeto Cólon e Esperança busca devolver esperança e acolhimento aos pacientes que enfrentam a luta contra o câncer.",
    },
    {
      heading: "Como Ajudar",
      content: [
        "Doação de bolsas de colostomia",
        "Doação de placas adesivas e pastas protetoras",
        "Produtos de higiene pessoal",
        "Pomadas e materiais auxiliares de estomia",
        "Apoio financeiro para aquisição direta dos materiais",
      ],
    },
    {
      heading: "Público-Alvo",
      content:
        "Pacientes oncológicos ostomizados em situação de vulnerabilidade social atendidos pela AAPOC.",
    },
    {
      heading: "Impacto Social",
      content: [
        "Melhorar a qualidade de vida dos pacientes",
        "Garantir mais dignidade no tratamento",
        "Reduzir complicações de saúde",
        "Fortalecer o acolhimento humanizado",
        "Levar esperança para famílias em situação de vulnerabilidade",
      ],
    },
  ],
};

const casaDeApoioModal: ProjectModal = {
  tagline: '"Um lar longe de casa."',
  description:
    "A Casa de Apoio é uma infraestrutura de acolhimento transitório para pacientes oncológicos em trânsito. Permite que o paciente e um acompanhante durmam, façam refeições ou aguardem o transporte de volta para suas cidades de origem de forma 100% gratuita.",
  sections: [
    {
      heading: "Objetivo",
      content:
        "Oferecer alojamento transitório gratuito para pacientes oncológicos de outros municípios do interior de Mato Grosso e seus acompanhantes durante o período de tratamento em Cuiabá.",
    },
    {
      heading: "Como Funciona",
      content: [
        "Acolhimento de pacientes e acompanhantes vindos do interior do estado",
        "Pernoite gratuito enquanto aguardam transporte e vans municipais",
        "Alimentação e suporte durante a estadia",
        "Ambiente humanizado, seguro e acolhedor",
      ],
    },
    {
      heading: "Público-Alvo",
      content:
        "Pacientes oncológicos de outros municípios de Mato Grosso e seus acompanhantes que precisam se deslocar até Cuiabá para tratamento no SUS.",
    },
    {
      heading: "Impacto Social",
      content: [
        "Eliminar a barreira geográfica no acesso ao tratamento oncológico",
        "Zerar custos de hospedagem para famílias vulneráveis",
        "Garantir que nenhum paciente abandone o tratamento por falta de onde ficar",
        "Promover acolhimento humanizado fora do ambiente hospitalar",
      ],
    },
  ],
};

const alemDaRendaModal: ProjectModal = {
  tagline: '"Devolver a autoestima é também cuidar da cura."',
  description:
    "Projeto focado em mulheres que passaram por mastectomia. Realiza a doação de sutiãs com próteses acopladas, devolvendo conforto, autoestima e dignidade às assistidas.",
  sections: [
    {
      heading: "Objetivo",
      content:
        "Apoiar mulheres mastectomizadas assistidas pela AAPOC com doação de sutiãs com próteses acopladas, promovendo bem-estar físico e emocional.",
    },
    {
      heading: "Histórico",
      content:
        "Anteriormente o projeto também doava próteses de silicone, mas a demanda foi absorvida pelo SUS após a sanção de uma nova lei que garante a cobertura integral do valor da prótese.",
    },
    {
      heading: "Público-Alvo",
      content: "Mulheres assistidas pela AAPOC que passaram por mastectomia.",
    },
    {
      heading: "Como Ajudar",
      content: [
        "Doação de sutiãs com próteses acopladas",
        "Doação de sutiãs pós-cirúrgicos",
        "Apoio financeiro para aquisição dos itens",
        "Divulgação do projeto para ampliar o alcance",
      ],
    },
    {
      heading: "Impacto Social",
      content: [
        "Recuperar a autoestima e a imagem corporal das pacientes",
        "Reduzir o sofrimento emocional pós-mastectomia",
        "Facilitar a reinserção social das assistidas",
        "Garantir conforto físico durante e após o tratamento",
      ],
    },
  ],
};

const informacaoSalvaVidasModal: ProjectModal = {
  tagline: '"Ter câncer não é o fim, mas sim o começo de uma nova história."',
  description:
    "Iniciativa educacional que leva conscientização sobre prevenção do câncer a empresas, escolas e instituições. O serviço é gratuito, porém aberto a doações conforme a vontade do parceiro.",
  sections: [
    {
      heading: "Objetivo",
      content:
        "Disseminar informação de qualidade sobre prevenção e enfrentamento do câncer, reduzindo o medo e promovendo diagnóstico precoce na sociedade.",
    },
    {
      heading: "Atividades",
      content: [
        "Distribuição de panfletos informativos sobre todos os tipos de câncer",
        "Palestras ministradas pela coordenação e voluntárias da AAPOC",
        "Testemunhos reais de vivência e superação da doença",
        "Ações em empresas, escolas e instituições parceiras",
      ],
    },
    {
      heading: "Público-Alvo",
      content: "Empresas, escolas, instituições e sociedade em geral.",
    },
    {
      heading: "Como Participar",
      content: [
        "Convidar a AAPOC para realizar uma palestra em sua empresa ou escola",
        "Realizar doações voluntárias após as ações",
        "Compartilhar o material informativo com sua rede de contatos",
        "Tornar-se parceiro institucional do projeto",
      ],
    },
  ],
};

const bemEstarModal: ProjectModal = {
  tagline: '"Cuidado integral para quem mais precisa."',
  description:
    "O Bem-Estar APOC consolida uma ampla rede de parceiros que oferecem atendimento especializado e descontos para os assistidos da AAPOC, garantindo acesso a serviços essenciais durante o tratamento.",
  sections: [
    {
      heading: "Objetivo",
      content:
        "Construir e manter uma rede de parceiros voluntários e empresas que ofereçam atendimento especializado e condições diferenciadas aos pacientes assistidos pela AAPOC.",
    },
    {
      heading: "Profissionais Voluntários e Parceiros",
      content: [
        "Dentistas",
        "Nutricionistas",
        "Advogados",
        "Fisioterapeutas oncológicos",
        "Psicólogos",
        "Terapeutas de constelação familiar",
      ],
    },
    {
      heading: "Empresas Parceiras",
      content: [
        "Laboratórios de análises clínicas",
        "Farmácias de manipulação",
        "Óticas e clínicas parceiras",
      ],
    },
    {
      heading: "Público-Alvo",
      content: "Pacientes oncológicos e familiares assistidos pela AAPOC.",
    },
    {
      heading: "Como se Tornar Parceiro",
      content: [
        "Oferecer atendimento gratuito ou com desconto aos assistidos",
        "Disponibilizar profissional voluntário para ações da AAPOC",
        "Entrar em contato com a associação para firmar parceria formal",
      ],
    },
  ],
};

const amorQueAlimentaModal: ProjectModal = {
  tagline: '"Nutrição e acolhimento para quem enfrenta o tratamento."',
  description:
    "Um dos projetos mais longevos da AAPOC, com mais de 3 anos de atuação. Focado na nutrição e acolhimento dos pacientes oncológicos em tratamento no Instituto de Tumores e Cuidados Paliativos de Cuiabá (ITC), anexo ao Hospital Geral.",
  sections: [
    {
      heading: "Objetivo",
      content:
        "Oferecer caldos nutritivos gratuitamente aos pacientes em tratamento no ITC/Cuiabá, promovendo nutrição adequada e acolhimento humano durante as sessões de tratamento.",
    },
    {
      heading: "Impacto",
      content: "Mais de 37.000 caldos entregues desde o início do projeto.",
    },
    {
      heading: "Operação",
      content: [
        "Segundas e quartas: caldos preparados pela coordenação da AAPOC",
        "Quintas-feiras: caldos preparados pela voluntária Sandra (também assistida da AAPOC)",
        "Atendimento no ITC - Instituto de Tumores e Cuidados Paliativos (atendimento SUS)",
      ],
    },
    {
      heading: "Público-Alvo",
      content:
        "Pacientes em tratamento oncológico no ITC/Cuiabá (Hospital Geral - atendimento SUS).",
    },
    {
      heading: "Como Ajudar",
      content: [
        "Doação de ingredientes para o preparo dos caldos (legumes, carnes, temperos)",
        "Apoio financeiro para custeio dos insumos",
        "Voluntariado no preparo e na distribuição",
        "Doação de utensílios e equipamentos de cozinha",
      ],
    },
  ],
};

const diaAModal: ProjectModal = {
  tagline: '"Um encontro de esperança, partilha e cuidado."',
  description:
    "O Dia A (Dia APOC) é uma reunião mensal presencial realizada geralmente no último sábado de cada mês. É um momento de congraçamento, distribuição de recursos arrecadados e fortalecimento do vínculo entre os assistidos.",
  sections: [
    {
      heading: "Objetivo",
      content:
        "Reunir mensalmente os assistidos da AAPOC para distribuição de recursos, palestras educativas e fortalecimento dos laços de comunidade e apoio mútuo.",
    },
    {
      heading: "Atividades",
      content: [
        "Palestras temáticas alinhadas à campanha do mês",
        "Distribuição de sacolões de alimentos",
        "Suplementação alimentar para os assistidos",
        "Mimos e itens de cuidado pessoal",
        "Feira Empodera Elas integrada ao evento",
      ],
    },
    {
      heading: "Quando Acontece",
      content:
        "Geralmente no último sábado de cada mês. Acompanhe a nossa agenda oficial no site para confirmar cada data.",
    },
    {
      heading: "Público-Alvo",
      content: "Pacientes oncológicos e familiares assistidos pela AAPOC.",
    },
    {
      heading: "Como Ajudar",
      content: [
        "Doação de alimentos não-perecíveis para os sacolões",
        "Doação de produtos de higiene e cuidado pessoal",
        "Voluntariado na organização e distribuição",
        "Patrocínio ou doação financeira para custear o evento",
      ],
    },
  ],
};

const bancoLencosModal: ProjectModal = {
  tagline: '"Autoestima não pode ser tirada pelo tratamento."',
  description:
    "A AAPOC detém atualmente o maior banco de perucas do estado de Mato Grosso, com quase 200 perucas de cabelos naturais. O projeto devolve autoestima e confiança a pacientes que enfrentam a queda capilar durante o tratamento oncológico.",
  sections: [
    {
      heading: "Objetivo",
      content:
        "Disponibilizar perucas de cabelos naturais em regime de empréstimo e doar lenços e turbantes para pacientes oncológicos que sofrem queda capilar durante o tratamento.",
    },
    {
      heading: "Como Funciona",
      content: [
        "Perucas emprestadas mediante preenchimento de ficha de controle",
        "Lenços e turbantes doados em definitivo aos assistidos",
        "Acervo com quase 200 perucas de cabelos naturais",
        "Maior banco de perucas de Mato Grosso",
      ],
    },
    {
      heading: "Público-Alvo",
      content:
        "Pacientes em tratamento oncológico que apresentam queda capilar, assistidos pela AAPOC.",
    },
    {
      heading: "Como Ajudar",
      content: [
        "Doação de perucas de cabelos naturais em bom estado",
        "Doação de mechas de cabelo para confecção",
        "Doação de lenços, faixas e turbantes novos",
        "Apoio financeiro para higienização e manutenção das perucas",
      ],
    },
    {
      heading: "Impacto Social",
      content: [
        "Devolver autoestima e confiança durante o tratamento",
        "Reduzir o impacto emocional da queda capilar",
        "Facilitar a reinserção social e profissional dos assistidos",
        "Promover bem-estar integral para além do tratamento médico",
      ],
    },
  ],
};

const empoderaElasModal: ProjectModal = {
  tagline: '"Geração de renda é também parte do tratamento."',
  description:
    "Feira itinerante e fixa (realizada durante o Dia A) focada na geração de renda exclusiva para pacientes oncológicas assistidas pela AAPOC. A associação não retém nenhum percentual das vendas - todo o lucro é direcionado às próprias empreendedoras.",
  sections: [
    {
      heading: "Objetivo",
      content:
        "Criar um espaço de geração de renda exclusivo para pacientes oncológicas assistidas, apoiando sua autonomia financeira e reinserção social durante e após o tratamento.",
    },
    {
      heading: "Como Funciona",
      content: [
        "Feira realizada durante o Dia A (último sábado do mês)",
        "Edições itinerantes em empresas, feiras e eventos parceiros",
        "100% do lucro das vendas vai diretamente para as empreendedoras",
        "A AAPOC não retém nenhuma taxa ou percentual",
        "Recursos auxiliam com medicamentos, suplementos e despesas familiares",
      ],
    },
    {
      heading: "Empreendedoras Ativas",
      content: [
        "Dona Maria - Lasanhas artesanais",
        "Sida - Cremozinho",
        "Arlete - Revenda de cosméticos (Avon, Natura, Boticário)",
        "Rosana - Moda íntima",
        "Andreia - Bolos caseiros",
        "Ana Elisa - Doces",
      ],
    },
    {
      heading: "Público-Alvo",
      content: "Pacientes oncológicas assistidas pela AAPOC que desejam empreender.",
    },
    {
      heading: "Como Apoiar",
      content: [
        "Comprar os produtos das empreendedoras",
        "Indicar a feira para empresas, eventos e condomínios",
        "Ceder espaço gratuito para edições itinerantes",
        "Divulgar o trabalho das empreendedoras nas redes sociais",
      ],
    },
  ],
};

const lacreSolidarioModal: ProjectModal = {
  tagline: '"Pequenos lacres, grande impacto."',
  description:
    "Campanha de arrecadação de lacres de alumínio para conversão em recursos financeiros. O objetivo é suprir lacunas de doações que não são cobertas por itens não-perecíveis, garantindo proteínas e itens essenciais para as refeições da AAPOC.",
  sections: [
    {
      heading: "Objetivo",
      content:
        "Arrecadar lacres de alumínio e convertê-los em recursos financeiros para a compra de proteínas e itens essenciais não cobertos pelas doações convencionais de alimentos não-perecíveis.",
    },
    {
      heading: "Como Funciona",
      content: [
        "Arrecadação de lacres de alumínio de latas de bebidas e conservas",
        "Conversão dos lacres em recursos financeiros",
        "Compra de proteínas: carne, frango, ovos",
        "Destinação para refeições diárias na sede e na Casa de Apoio",
      ],
    },
    {
      heading: "Por Que Lacres?",
      content:
        "As doações convencionais geralmente suprem arroz, feijão e óleo, mas não cobrem proteínas animais. Os lacres permitem adquirir exatamente esses itens que fazem falta no dia a dia dos assistidos.",
    },
    {
      heading: "Destinação dos Recursos",
      content: [
        "Refeições servidas diariamente na sede (bazares e atendimentos)",
        "Alimentação dos hóspedes da Casa de Apoio",
        "Manutenção da sede e da Casa de Apoio",
      ],
    },
    {
      heading: "Como Participar",
      content: [
        "Guardar e entregar lacres de alumínio na AAPOC",
        "Organizar pontos de coleta em empresas, condomínios e escolas",
        "Indicar novos parceiros para a campanha",
        "Divulgar nas redes sociais",
      ],
    },
  ],
};

const defaultProjects: Project[] = [
  {
    title: "Cólon e Esperança",
    category: ["saude", "acolhimento"],
    categoryLabel: "Saúde & Dignidade",
    impactHighlight: "Dignidade & Bolsas Gratuitas",
    ctaText: "Doar Bolsas / Insumos",
    monthYear: "Projeto 2026",
    image: colon,
    alt: "Projeto Cólon e Esperança",
    description:
      "Aquisição e doação de bolsas de colostomia para assistidos que necessitam de estomia. A dignidade começa no cuidado contínuo.",
    modal: colonModal,
  },
  {
    title: "Casa de Apoio",
    category: ["acolhimento"],
    categoryLabel: "Acolhimento & Moradia",
    impactHighlight: "Hospedagem 100% Gratuita",
    ctaText: "Apoiar a Casa de Apoio",
    monthYear: "Desde Jan/2026",
    image: "/img/casa_apoio.jpeg",
    alt: "Casa de Apoio Carmen Lúcia",
    description:
      "Alojamento transitório gratuito para pacientes oncológicos de outros municípios de MT e seus acompanhantes durante o tratamento em Cuiabá.",
    modal: casaDeApoioModal,
  },
  {
    title: "Além da Renda",
    category: ["autoestima"],
    categoryLabel: "Autoestima Feminina",
    impactHighlight: "Próteses & Sutiãs Especiais",
    ctaText: "Doar Sutiãs / Próteses",
    monthYear: "Projeto Ativo",
    image: "/img/renda.jpg",
    alt: "Projeto Além da Renda",
    description:
      "Doação de sutiãs com próteses acopladas para mulheres assistidas que passaram por mastectomia, devolvendo conforto e autoestima.",
    modal: alemDaRendaModal,
  },
  {
    title: "Informação Salva-Vidas",
    category: ["empoderamento"],
    categoryLabel: "Educação & Prevenção",
    impactHighlight: "Palestras em Empresas & Escolas",
    ctaText: "Solicitar Palestra",
    monthYear: "Projeto Ativo",
    image: "/img/salva_vidas.jpeg",
    alt: "Projeto Informação Salva-Vidas",
    description:
      "Palestras de conscientização sobre prevenção do câncer em empresas e escolas, com distribuição de materiais e testemunhos reais.",
    modal: informacaoSalvaVidasModal,
  },
  {
    title: "Bem-Estar APOC",
    category: ["saude"],
    categoryLabel: "Saúde & Especialistas",
    impactHighlight: "Rede de Especialistas Voluntários",
    ctaText: "Ser Profissional Parceiro",
    monthYear: "Projeto Ativo",
    image: "/img/bem_estar.jpg",
    alt: "Projeto Bem-Estar APOC",
    description:
      "Rede de parceiros voluntários (dentistas, psicólogos, nutricionistas, fisioterapeutas) e empresas que oferecem atendimentos e descontos aos assistidos.",
    modal: bemEstarModal,
  },
  {
    title: "Amor que Alimenta e Aquece",
    category: ["saude", "acolhimento"],
    categoryLabel: "Nutrição Hospitalar",
    impactHighlight: "+37.000 Caldos Entregues",
    ctaText: "Doar Alimentos para os Caldos",
    monthYear: "Desde 2022",
    image: "/img/caldos.jpeg",
    alt: "Amor que Alimenta e Aquece",
    description:
      "Mais de 37.000 caldos nutritivos entregues a pacientes em tratamento no ITC/Cuiabá. Preparados semanalmente por voluntárias dedicadas.",
    modal: amorQueAlimentaModal,
  },
  {
    title: "Dia A (Dia APOC)",
    category: ["acolhimento", "empoderamento"],
    categoryLabel: "Encontro Comunitário",
    impactHighlight: "Encontro Mensal & Sacolões",
    ctaText: "Apoiar o Próximo Dia A",
    monthYear: "Encontro Mensal",
    image: "/img/dia_a.jpeg",
    alt: "Dia A - Dia APOC",
    description:
      "Reunião mensal no último sábado do mês com palestras temáticas, distribuição de sacolões de alimentos, suplementação e feira de apoio.",
    modal: diaAModal,
  },
  {
    title: "Banco de Lenços e Perucas",
    category: ["autoestima"],
    categoryLabel: "Autoestima & Cuidado",
    impactHighlight: "Maior Banco de MT (~200 Perucas)",
    ctaText: "Doar Perucas / Cabelo",
    monthYear: "Projeto Ativo",
    image: "/img/perucas.jpeg",
    alt: "Banco de Lenços e Perucas",
    description:
      "Maior banco de perucas de cabelos naturais de MT. Empréstimo gratuito de perucas e doação de lenços para pacientes com queda capilar.",
    modal: bancoLencosModal,
  },
  {
    title: "Empodera Elas",
    category: ["empoderamento"],
    categoryLabel: "Empreendedorismo",
    impactHighlight: "100% da Renda para Assistidas",
    ctaText: "Conhecer Empreendedoras",
    monthYear: "Feira Ativa",
    image: "/img/empodera.jpeg",
    alt: "Empodera Elas",
    description:
      "Feira de geração de renda exclusiva para pacientes oncológicas assistidas. A AAPOC não retém taxas: 100% do lucro vai para as mulheres.",
    modal: empoderaElasModal,
  },
  {
    title: "Lacre Solidário",
    category: ["acolhimento", "saude"],
    categoryLabel: "Sustentabilidade & Nutrição",
    impactHighlight: "Conversão de Lacres em Proteínas",
    ctaText: "Juntar & Entregar Lacres",
    monthYear: "Campanha Contínua",
    image: "/img/lacre-solidario.jpeg",
    alt: "Lacre Solidário",
    description:
      "Arrecadação de lacres de alumínio convertidos em recursos para a compra de proteínas (carnes, ovos) servidas nas refeições da sede e da Casa de Apoio.",
    modal: lacreSolidarioModal,
  },
];

const categoryFilters = [
  { id: "todos" as ProjectCategory, label: "Todos os Projetos", icon: Layers },
  { id: "acolhimento" as ProjectCategory, label: "Acolhimento & Moradia", icon: Home },
  { id: "saude" as ProjectCategory, label: "Saúde & Nutrição", icon: Utensils },
  { id: "autoestima" as ProjectCategory, label: "Autoestima & Cuidado", icon: Smile },
  { id: "empoderamento" as ProjectCategory, label: "Educação & Renda", icon: GraduationCap },
];

interface ProjectsGridProps {
  projects?: Project[];
}

const ProjectsGrid = ({ projects = defaultProjects }: ProjectsGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("todos");
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === "todos"
      ? projects
      : projects.filter((p) => p.category.includes(selectedCategory));

  return (
    <>
      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
        {categoryFilters.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          const count =
            cat.id === "todos"
              ? projects.length
              : projects.filter((p) => p.category.includes(cat.id)).length;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all ${
                isActive
                  ? "bg-foreground text-background shadow-md scale-105"
                  : "bg-card text-muted-foreground border border-border hover:text-foreground hover:border-foreground/40"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-black ${
                  isActive ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <article
            key={project.title}
            className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Image with Impact Badge Overlay */}
              <div
                className="overflow-hidden relative cursor-pointer"
                onClick={() => setOpenProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.alt}
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                    {project.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <div className="inline-flex items-center gap-1.5 bg-primary/95 text-primary-foreground text-xs font-black px-3 py-1.5 rounded-xl shadow-md backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5 text-accent" />
                    <span className="truncate">{project.impactHighlight}</span>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant="secondary" className="text-[10px] font-bold">
                    {project.monthYear}
                  </Badge>
                  <button
                    onClick={() => setOpenProject(project)}
                    className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Ver detalhes</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <h4
                  onClick={() => setOpenProject(project)}
                  className="font-display font-black text-foreground text-xl cursor-pointer hover:text-primary transition-colors"
                >
                  {project.title}
                </h4>

                <p className="text-sm text-muted-foreground mt-2.5 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Custom CTA Action Button */}
            <div className="p-6 pt-0 border-t border-border/60 mt-4">
              <button
                onClick={() => setOpenProject(project)}
                className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-muted hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-bold py-3 px-4 rounded-xl transition-all border border-border hover:border-primary shadow-sm hover:shadow-md"
              >
                <HeartHandshake className="w-4 h-4 text-primary group-hover:text-primary-foreground" />
                <span>{project.ctaText}</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Detailed Project Modal */}
      <Dialog open={!!openProject} onOpenChange={(open) => !open && setOpenProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
          {openProject && (
            <>
              <DialogHeader>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full border border-primary/20 w-fit mb-2">
                  <span>{openProject.categoryLabel}</span>
                </div>
                <DialogTitle className="text-2xl md:text-3xl font-display font-black text-foreground">
                  Projeto {openProject.title}
                </DialogTitle>
                <DialogDescription className="italic text-base text-secondary font-semibold">
                  {openProject.modal.tagline}
                </DialogDescription>
              </DialogHeader>

              {/* Modal Featured Image */}
              {openProject.image && (
                <div className="relative rounded-2xl overflow-hidden my-2 shadow-md">
                  <img
                    src={openProject.image}
                    alt={openProject.alt}
                    className="w-full h-60 object-cover"
                  />
                  <div className="absolute bottom-3 left-3">
                    <div className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-black px-3.5 py-1.5 rounded-xl shadow-lg">
                      <Sparkles className="w-3.5 h-3.5 text-accent" />
                      <span>{openProject.impactHighlight}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Description */}
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {openProject.modal.description}
              </p>

              {/* Sections Breakdown */}
              <div className="space-y-6 pt-4 border-t border-border">
                {openProject.modal.sections.map((section, idx) => (
                  <div key={idx} className="bg-muted/40 rounded-2xl p-5 border border-border/80">
                    <h5 className="font-display font-bold text-base text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{section.heading}</span>
                    </h5>

                    {Array.isArray(section.content) ? (
                      <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        {section.content.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* How to Help / Action Callout */}
              <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-hope/10 rounded-2xl p-6 border border-primary/20 text-center mt-6">
                <Heart className="w-8 h-8 text-secondary mx-auto mb-2" />
                <h5 className="font-display font-black text-xl text-foreground">
                  Gostaria de apoiar o Projeto {openProject.title}?
                </h5>
                <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                  Sua contribuição faz a diferença direta na vida dos pacientes oncológicos atendidos pela AAPOC.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
                  <a
                    href="#ajudar"
                    onClick={() => setOpenProject(null)}
                    className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm font-bold px-6 py-3 rounded-xl transition-all shadow-md hover:scale-105"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    <span>Como Ajudar (Chave PIX / Doações)</span>
                  </a>
                  <a
                    href="#contato"
                    onClick={() => setOpenProject(null)}
                    className="inline-flex items-center gap-2 bg-card hover:bg-muted text-foreground text-sm font-semibold px-5 py-3 rounded-xl transition-all border border-border"
                  >
                    <span>Falar Conosco</span>
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectsGrid;
