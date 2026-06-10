import ProjectsGrid from "./ProjectsGrid";

const ProjectsSection = () => {
  return (
    <section id="projetos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-secondary uppercase tracking-widest">Iniciativas</span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mt-2">
            Nossos Projetos
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Conheça as ações e campanhas que a AAPOC realiza para apoiar pacientes oncológicos e suas famílias.
          </p>
        </div>
        <ProjectsGrid />
      </div>
    </section>
  );
};

export default ProjectsSection;
