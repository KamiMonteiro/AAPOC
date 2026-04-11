import { Brain, Stethoscope, Scale, Smile } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Psicologia",
    description: "Acompanhamento psicológico para pacientes e familiares, oferecendo suporte emocional durante o tratamento.",
    color: "bg-hope/10 text-hope",
    iconBg: "bg-hope",
  },
  {
    icon: Stethoscope,
    title: "Fisioterapia",
    description: "Reabilitação física especializada para melhorar a qualidade de vida dos pacientes oncológicos.",
    color: "bg-primary/10 text-primary",
    iconBg: "bg-primary",
  },
  {
    icon: Smile,
    title: "Odontologia",
    description: "Cuidados odontológicos essenciais para pacientes em tratamento quimioterápico e radioterápico.",
    color: "bg-secondary/10 text-secondary",
    iconBg: "bg-secondary",
  },
  {
    icon: Scale,
    title: "Jurídico",
    description: "Orientação jurídica sobre direitos do paciente oncológico, benefícios previdenciários e assistenciais.",
    color: "bg-accent/10 text-accent-foreground",
    iconBg: "bg-accent",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-primary uppercase tracking-widest">Equipe Multidisciplinar</span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mt-2">
            Nossos Profissionais
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Atendimento humanizado com profissionais dedicados ao cuidado integral do paciente oncológico.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-xl transition-all hover:-translate-y-2 group"
            >
              <div className={`w-14 h-14 ${s.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                <s.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        {/* Extra support */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-hope/10 rounded-2xl p-8 max-w-3xl mx-auto text-center border border-border">
          <h3 className="text-xl font-display font-bold text-foreground">Também oferecemos</h3>
          <p className="text-muted-foreground mt-2">
            Auxílio com consultas, exames, dietas, cateteres e cestas de alimentos (sacolões) para pacientes em situação de vulnerabilidade.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
