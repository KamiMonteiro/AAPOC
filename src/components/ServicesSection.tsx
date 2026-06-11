import { Brain, Stethoscope, Scale, Smile } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const professionals = [
  {
    icon: Brain,
    title: "Psicologia",
    description:
      "Acompanhamento psicológico para pacientes e familiares, oferecendo suporte emocional durante o tratamento.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=700&fit=crop",
    color: "from-hope/80 to-hope/40",
  },
  {
    icon: Stethoscope,
    title: "Fisioterapia",
    description:
      "Reabilitação física especializada para melhorar a qualidade de vida dos pacientes oncológicos.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=700&fit=crop",
    color: "from-primary/80 to-primary/40",
  },
  {
    icon: Smile,
    title: "Odontologia",
    description:
      "Cuidados odontológicos essenciais para pacientes em tratamento quimioterápico e radioterápico.",
    image: "https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=600&h=700&fit=crop",
    color: "from-secondary/80 to-secondary/40",
  },
  {
    icon: Scale,
    title: "Jurídico",
    description:
      "Orientação jurídica sobre direitos do paciente oncológico, benefícios previdenciários e assistenciais.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=700&fit=crop",
    color: "from-accent/80 to-accent/40",
  },
   {
    icon:   Scale,
    title: "4 profissao aqui",
    description:
      "A QUAARTA PROFISSAO AQUI",
    image: "",
    color: "from-accent/80 to-accent/40",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-primary uppercase tracking-widest">
            Equipe Multidisciplinar
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mt-2">
            Nossos Profissionais
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Atendimento humanizado com profissionais dedicados ao cuidado integral do paciente oncológico.
          </p>
        </div>

        <div className="relative px-10">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-6">
              {professionals.map((p) => (
                <CarouselItem key={p.title} className="pl-6 basis-4/5 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="relative rounded-2xl overflow-hidden group h-[420px] shadow-lg border border-border">
                    <img
                      src={p.image}
                      alt={`Profissional de ${p.title}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${p.color} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <p.icon className="w-5 h-5" />
                        <h3 className="text-xl font-display font-bold">{p.title}</h3>
                      </div>
                      <p className="text-sm text-white/85 leading-relaxed">{p.description}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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
