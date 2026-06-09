import { Badge } from "@/components/ui/badge";
import colon from "@/assets/colon_projeto_2026.png";

type Project = {
  title: string;
  description: string;
  monthYear: string;
  image: string;
  alt: string;
};

const defaultProjects: Project[] = [
  {
    title: "Projeto Cólon e Esperança",
    monthYear: "2026",
    image: colon,
    alt: "Projeto Cólon e Esperança",
    description:
      "Doação de bolsas de colostomia para pacientes oncológicos. A dignidade começa no cuidado.",
  },
  {
    title: "Casa Transitória Carmen Lúcia",
    monthYear: "Jan/2026",
    image:
      "",
    alt: "Casa transitória acolhimento",
    description:
      "Acolhimento temporário com quartos compartilhados e apoio social para pacientes de outras cidades durante o tratamento.",
  },
  {
    title: "Campanha Outubro Rosa",
    monthYear: "Out/2024",
    image:
      " ",
    alt: "Campanha Outubro Rosa",
    description:
      "Atividades de prevenção, educação e arrecadação para apoiar mulheres em tratamento oncológico e fortalecer a prevenção.",
  },
  {
    title: "Cestas Básicas Solidárias",
    monthYear: "Mensal/2024",
    image:
      "",
    alt: "Cestas básicas solidárias",
    description:
      "Distribuição recorrente de alimentos e produtos de higiene para pacientes e familiares em situações de vulnerabilidade.",
  },
  {
    title: "Apoio Psicológico em Grupo",
    monthYear: "Mar/2024",
    image:
      "",
    alt: "Apoio psicológico em grupo",
    description:
      "Sessões semanais de suporte emocional para fortalecer a rede de apoio entre pacientes e familiares durante o tratamento.",
  },
  {
    title: "Mutirão de Exames",
    monthYear: "Set/2024",
    image:
      "",
    alt: "Mutirão de exames",
    description:
      "Campanha gratuita de exames preventivos para a comunidade, facilitando o diagnóstico precoce e a comunicação de riscos.",
  },
  {
    title: "Bazar Beneficente",
    monthYear: "Jul/2024",
    image:
      "",
    alt: "Bazar beneficente",
    description:
      "Evento de arrecadação com arrecadação de recursos para apoiar ações da AAPOC e fortalecer a comunidade local.",
  },
  {
    title: "Bazar Beneficente",
    monthYear: "Jul/2024",
    image:
      "",
    alt: "Bazar beneficente",
    description:
      "Evento de arrecadação com arrecadação de recursos para apoiar ações da AAPOC e fortalecer a comunidade local.",
  },
  {
    title: "Bazar Beneficente",
    monthYear: "Jul/2024",
    image:
      "",
    alt: "Bazar beneficente",
    description:
      "Evento de arrecadação com arrecadação de recursos para apoiar ações da AAPOC e fortalecer a comunidade local.",
  },
];

interface ProjectsGridProps {
  projects?: Project[];
}

const ProjectsGrid = ({ projects = defaultProjects }: ProjectsGridProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <article
          key={project.title}
          className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
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
            <Badge variant="secondary">{project.monthYear}</Badge>
            <div>
              <h4 className="font-display font-bold text-foreground text-lg">{project.title}</h4>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3">{project.description}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ProjectsGrid;
