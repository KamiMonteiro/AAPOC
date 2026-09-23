import heroBg from "@/assets/hero-bg.jpg";
import { Heart, ArrowDown, Calendar } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Mãos unidas em apoio aos pacientes oncológicos"
          width={1920}
          height={1024}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-fade-up pt-24 pb-16">
        <div className="inline-flex items-center gap-2 bg-secondary/90 backdrop-blur-sm rounded-full px-5 py-2 mb-6 shadow-md">
          <Heart className="w-4 h-4 text-secondary-foreground" />
          <span className="text-sm font-bold text-secondary-foreground">Desde 2020 levando esperança</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-primary-foreground leading-tight max-w-4xl mx-auto drop-shadow-sm">
          Associação de Apoio aos Pacientes Oncológicos de Cuiabá
        </h1>

        <p className="mt-6 text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto font-body leading-relaxed">
          "O câncer não espera! Portanto, toda causa envolvendo o paciente oncológico é{" "}
          <span className="font-bold text-accent">urgente e importante!</span>"
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#eventos"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
          >
            <Calendar className="w-5 h-5" />
            Próximos Eventos
          </a>
          <a
            href="#ajudar"
            className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
          >
            <Heart className="w-5 h-5" />
            Como Ajudar
          </a>
          <a
            href="#historia"
            className="inline-flex items-center justify-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground font-bold px-8 py-4 rounded-full text-lg transition-all backdrop-blur-sm border border-primary-foreground/30"
          >
            Nossa História
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { number: "60.000+", label: "Atendimentos" },
            { number: "450+", label: "Pacientes ativos" },
            { number: "20", label: "Voluntários" },
            { number: "8+", label: "Projetos" },
          ].map((s) => (
            <div key={s.label} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 border border-primary-foreground/20">
              <div className="text-2xl md:text-3xl font-display font-black text-accent">{s.number}</div>
              <div className="text-sm text-primary-foreground/80 font-body mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#eventos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float text-primary-foreground/70 hover:text-primary-foreground transition-colors"
        aria-label="Rolar para eventos"
      >
        <ArrowDown className="w-6 h-6" />
      </a>
    </section>
  );
};

export default HeroSection;
