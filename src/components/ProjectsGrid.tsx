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

type ModalSection = {
  heading: string;
  content: string | string[];
};

type ProjectModal = {
  tagline: string;
  description: string;
  sections: ModalSection[];
};

type Project = {
  title: string;
  description: string;
  monthYear: string;
  image: string;
  alt: string;
  modal?: ProjectModal;
};

const colonModal: ProjectModal = {
  tagline: '"A dignidade começa no cuidado."',
  description:
    "A AAPOC – Associação de Apoio aos Pacientes Oncológicos de Cuiabá atua acolhendo pacientes e familiares que enfrentam diariamente os desafios do câncer. Entre as maiores dificuldades encontradas pelos pacientes ostomizados está o acesso contínuo às bolsas de colostomia, item essencial para a sobrevivência, higiene, mobilidade, autoestima e dignidade humana.",
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
        "Bolsas de colostomia",
        "Placas adesivas",
        "Pastas protetoras",
        "Produtos de higiene",
        "Pomadas e materiais auxiliares",
        "Apoio financeiro para aquisição dos materiais",
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
    "A Casa de Apoio é uma infraestrutura de passagem para pacientes oncológicos em trânsito. Permite que o paciente e um acompanhante durmam ou aguardem o transporte de volta para suas cidades de origem de forma 100% gratuita.",
  sections: [
    {
      heading: "Objetivo",
      content:
        "Oferecer alojamento transitório gratuito para pacientes oncológicos de outros municípios e seus acompanhantes durante o período de tratamento em Cuiabá.",
    },
    {
      heading: "Como Funciona",
      content: [
        "Acolhimento de pacientes e acompanhantes vindos de outros municípios",
        "Pernoite gratuito enquanto aguardam transporte (vans municipais)",
        "Apoio logístico para deslocamento até o local de tratamento",
        "Ambiente humanizado e acolhedor",
      ],
    },
    {
      heading: "Público-Alvo",
      content:
        "Pacientes oncológicos de outros municípios do Mato Grosso e seus acompanhantes que precisam se deslocar até Cuiabá para tratamento.",
    },
    {
      heading: "Impacto Social",
      content: [
        "Eliminar a barreira geográfica no acesso ao tratamento oncológico",
        "Reduzir custos de hospedagem para famílias vulneráveis",
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
        "Palestras ministradas pela coordenação e voluntárias",
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
        "Compartilhar o material informativo com sua rede",
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
        "Óticas",
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
        "Atendimento no ITC — Instituto de Tumores e Cuidados Paliativos (atendimento SUS)",
      ],
    },
    {
      heading: "Público-Alvo",
      content:
        "Pacientes em tratamento oncológico no ITC/Cuiabá (Hospital Geral — atendimento SUS).",
    },
    {
      heading: "Como Ajudar",
      content: [
        "Doação de ingredientes para o preparo dos caldos",
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
        "Palestras temáticas alinhadas à campanha do mês (ex: Maio Vermelho — câncer de boca, com doação de escovas de dente)",
        "Distribuição de sacolões e alimentos",
        "Suplementação alimentar para os assistidos",
        "Mimos e itens de cuidado pessoal",
        "Feira Empodera Elas integrada ao evento",
      ],
    },
    {
      heading: "Quando",
      content:
        "Geralmente no último sábado de cada mês. Acompanhe as redes sociais da AAPOC para confirmar a data de cada edição.",
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
        "Maior banco de perucas do Mato Grosso",
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
        "Doação de lenços e turbantes",
        "Apoio financeiro para higienização e manutenção das perucas",
        "Divulgação para ampliar o acervo do banco",
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
    "Feira itinerante e fixa (realizada durante o Dia A) focada na geração de renda exclusiva para pacientes oncológicas assistidas pela AAPOC. A associação não retém nenhum percentual das vendas — todo o lucro é direcionado às próprias empreendedoras.",
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
        "Edições itinerantes em eventos e parceiros",
        "100% do lucro das vendas vai para as empreendedoras",
        "A AAPOC não retém nenhum percentual",
        "Recursos auxiliam com medicamentos, suplementos e despesas de vida",
      ],
    },
    {
      heading: "Empreendedoras Ativas",
      content: [
        "Dona Maria — Lasanhas",
        "Sida — Cremozinho",
        "Arlete — Revenda de cosméticos (Avon, Natura, Boticário)",
        "Rosana — Moda íntima",
        "Andreia — Bolos caseiros",
        "Ana Elisa — Doces",
      ],
    },
    {
      heading: "Público-Alvo",
      content: "Pacientes oncológicas assistidas pela AAPOC que desejam empreender.",
    },
    {
      heading: "Como Apoiar",
      content: [
        "Comprar dos produtos das empreendedoras",
        "Indicar a feira para empresas e eventos",
        "Ceder espaço para edições itinerantes",
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
        "Guardar e entregar lacres de alumínio à AAPOC",
        "Organizar campanhas de arrecadação em empresas e escolas",
        "Indicar pontos de coleta para a associação",
        "Divulgar a campanha nas redes sociais",
      ],
    },
  ],
};

const defaultProjects: Project[] = [
  {
    title: "Cólon e Esperança",
    monthYear: "2026",
    image: colon,
    alt: "Projeto Cólon e Esperança",
    description:
      "Aquisição e doação de bolsas de colostomia para assistidos que necessitam de estomia. A dignidade começa no cuidado.",
    modal: colonModal,
  },
  {
    title: "Casa de Apoio",
    monthYear: "Jan/2026",
    image: "",
    alt: "Casa de Apoio Carmen Lúcia",
    description:
      "Alojamento transitório 100% gratuito para pacientes oncológicos de outros municípios e seus acompanhantes aguardarem ou pernoctarem durante o tratamento em Cuiabá.",
    modal: casaDeApoioModal,
  },
  {
    title: "Além da Renda",
    monthYear: "Ativo",
    image: "",
    alt: "Projeto Além da Renda",
    description:
      "Doação de sutiãs com próteses acopladas para mulheres assistidas que passaram por mastectomia, devolvendo autoestima e conforto.",
    modal: alemDaRendaModal,
  },
  {
    title: "Informação Salva-Vidas",
    monthYear: "Ativo",
    image: "",
    alt: "Projeto Informação Salva-Vidas",
    description:
      "Palestras gratuitas de conscientização sobre prevenção do câncer em empresas, escolas e instituições, com distribuição de panfletos e testemunhos reais de superação.",
    modal: informacaoSalvaVidasModal,
  },
  {
    title: "Bem-Estar APOC",
    monthYear: "Ativo",
    image: "",
    alt: "Projeto Bem-Estar APOC",
    description:
      "Rede de parceiros voluntários — dentistas, nutricionistas, psicólogos, fisioterapeutas oncológicos, laboratórios e farmácias — que oferecem atendimento especializado e descontos aos assistidos.",
    modal: bemEstarModal,
  },
  {
    title: "Amor que Alimenta e Aquece",
    monthYear: "Desde 2022",
    image: "",
    alt: "Amor que Alimenta e Aquece",
    description:
      "Mais de 37.000 caldos nutritivos entregues a pacientes em tratamento no ITC/Cuiabá. Preparados às segundas, quartas e quintas por voluntárias da AAPOC.",
    modal: amorQueAlimentaModal,
  },
  {
    title: "Dia A (Dia APOC)",
    monthYear: "Mensal",
    image: "",
    alt: "Dia A - Dia APOC",
    description:
      "Encontro mensal realizado no último sábado do mês com palestras temáticas, distribuição de sacolões, suplementação alimentar e mimos para os assistidos.",
    modal: diaAModal,
  },
  {
    title: "Banco de Lenços e Perucas",
    monthYear: "Ativo",
    image: "",
    alt: "Banco de Lenços e Perucas",
    description:
      "Maior banco de perucas de cabelos naturais do Mato Grosso, com quase 200 unidades. Empréstimo de perucas e doação de lenços e turbantes para pacientes em queda capilar.",
    modal: bancoLencosModal,
  },
  {
    title: "Empodera Elas",
    monthYear: "Ativo",
    image: "",
    alt: "Empodera Elas",
    description:
      "Feira de empreendedorismo itinerante e fixa exclusiva para pacientes oncológicas assistidas gerarem renda. Todo o lucro vai integralmente para as empreendedoras.",
    modal: empoderaElasModal,
  },
  {
    title: "Lacre Solidário",
    monthYear: "Ativo",
    image: "",
    alt: "Lacre Solidário",
    description:
      "Arrecadação de lacres de alumínio convertidos em recursos financeiros para compra de proteínas e itens essenciais para as refeições da sede e da Casa de Apoio.",
    modal: lacreSolidarioModal,
  },
];

interface ProjectsGridProps {
  projects?: Project[];
}

const ProjectsGrid = ({ projects = defaultProjects }: ProjectsGridProps) => {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            onClick={() => project.modal && setOpenProject(project)}
            className={[
              "group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl",
              project.modal ? "cursor-pointer" : "",
            ].join(" ")}
          >
            <div className="overflow-hidden">
              <img
                src={project.image}
                alt={project.alt}
                className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{project.monthYear}</Badge>
                {project.modal && (
                  <span className="text-xs text-muted-foreground underline underline-offset-2">
                    Ver detalhes
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-display font-bold text-foreground text-lg">{project.title}</h4>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{project.description}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <Dialog open={!!openProject} onOpenChange={(open) => !open && setOpenProject(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {openProject?.modal && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-display font-black text-foreground">
                  Projeto {openProject.title}
                </DialogTitle>
                <DialogDescription className="italic text-base text-secondary font-medium">
                  {openProject.modal.tagline}
                </DialogDescription>
              </DialogHeader>

              {openProject.image && (
                <img
                  src={openProject.image}
                  alt={openProject.alt}
                  className="w-full h-52 object-cover rounded-xl"
                />
              )}

              <p className="text-sm text-muted-foreground leading-relaxed">
                {openProject.modal.description}
              </p>

              <div className="space-y-5">
                {openProject.modal.sections.map((section) => (
                  <div key={section.heading}>
                    <h5 className="font-display font-bold text-foreground text-sm uppercase tracking-widest mb-2">
                      {section.heading}
                    </h5>
                    {Array.isArray(section.content) ? (
                      <ul className="space-y-1">
                        {section.content.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectsGrid;
