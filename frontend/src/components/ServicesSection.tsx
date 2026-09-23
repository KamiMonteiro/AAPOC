import { Brain, Stethoscope, Scale, Smile, Users, Apple } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const professionals = [
  {
    icon: Brain,
    title: "Psicologia",
    description:
      "Acompanhamento psicológico para pacientes e familiares, oferecendo suporte emocional durante o tratamento.",
    banner: "/img/psicologa.jpeg",
    team: [
      { name: "Dra. Bianca Boscoli", image: "/img/Dra. Bianca.Boscoli.jpeg" }
    ],
    color: "text-hope",
  },
  {
    icon: Stethoscope,
    title: "Fisioterapia",
    description:
      "Reabilitação física especializada para melhorar a qualidade de vida dos pacientes oncológicos.",
    banner: "/img/fisioterapia.jpeg",
    team: [
      { name: "Dra. Luciana Ferraz", image: "/img/Luciana-Ferraz.jpeg" }
    ],
    color: "text-primary",
  },
  {
    icon: Smile,
    title: "Odontologia",
    description:
      "Cuidados odontológicos essenciais para pacientes em tratamento quimioterápico e radioterápico.",
    banner: "/img/dentista.jpeg",
    team: [
      { name: "Dra. Patrícia Radis", image: "/img/Dra. Patricia.jpeg" }
    ],
    color: "text-secondary",
  },
  {
    icon: Scale,
    title: "Jurídico",
    description:
      "Orientação jurídica sobre direitos do paciente oncológico, benefícios previdenciários e assistenciais. Atendimento com a Dra. Fernanda Giacomini.",
    banner: "/img/juridico-fernanda.jpeg", 
    team: [
      { name: "Dra. Fernanda Giacomini", image: "/img/Dra. Fernanda.jpeg" }
    ],
    color: "text-accent",
  },
  {
    icon: Scale,
    title: "Jurídico",
    description:
      "Orientação jurídica sobre direitos do paciente oncológico, benefícios previdenciários e assistenciais. Atendimento com a Dra. Natália Dantas.",
    banner: "/img/juridico-nathalia.jpeg", 
    team: [
      { name: "Dra. Natália Dantas", image: "/img/Nathalia Dantas.jpeg" } 
    ],
    color: "text-accent",
  },
  {
    icon: Users,
    title: "Constelação Familiar",
    description:
      "A terapia de Constelação Familiar é uma abordagem que busca identificar e resolver conflitos emocionais ou bloqueios através do reconhecimento das dinâmicas internas de um sistema familiar. Esses encontros são promovidos por terapeutas parceiros e voluntários, onde o valor arrecadado com as sessões é revertido para a casa de apoio e os projetos assistenciais da instituição.",
    banner: "/img/Constelação.jpeg",
    team: [
      { name: "Dra. Maria Luzélia", image: "/img/Dra. Maria Luzélia.jpeg" }
    ],
    color: "text-purple-600", 
  },
  {
    icon: Apple,
    title: "Nutrição",
    description:
      "Aprenda a se alimentar de forma saudável e equilibrada, entenda sobre calorias e crie novos hábitos alimentares adequados ao tratamento.",
    banner: "/img/nutricionista.jpeg",
    team: [
      { name: "Dr. João Victor Amorim", image: "/img/Dr Joao.jpeg" }
    ],
    color: "text-green-600",
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
            Atendimento humanizado com profissionais dedicados ao cuidado integral do paciente oncológico. Clique nos cartões para ver detalhes.
          </p>
        </div>

        <div className="relative px-10">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-6">
              {professionals.map((p, index) => (
                // Alterado a key para usar o índice evitando conflitos de nomes iguais no "Jurídico"
                <CarouselItem key={`${p.title}-${index}`} className="pl-6 basis-4/5 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      {/* CARD DA CAPA */}
                      <div className="rounded-2xl overflow-hidden group shadow-lg border border-border flex flex-col h-full bg-card cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
                        
                        {/* Imagem de Capa: BANNER DE ATENDIMENTO */}
                        <div className="relative w-full h-[320px] bg-slate-50 dark:bg-muted/20 overflow-hidden flex items-center justify-center p-2">
                          <img
                            src={p.banner}
                            alt={`Banner de Horários - ${p.title}`}
                            className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        
                        {/* Texto de Apoio na Capa */}
                        <div className="p-6 flex flex-col flex-grow bg-background">
                          <div className="flex items-center gap-2 mb-3">
                            <p.icon className={`w-6 h-6 ${p.color || "text-primary"}`} />
                            <h3 className="text-xl font-display font-bold text-foreground">{p.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                            {p.description}
                          </p>
                          <span className="mt-auto text-sm font-semibold text-primary underline underline-offset-4">
                            Ver profissional e horários
                          </span>
                        </div>
                      </div>
                    </DialogTrigger>

                    {/* CONTEÚDO DO MINI MODAL (Ao clicar) */}
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-2xl font-display">
                          <p.icon className={`w-8 h-8 ${p.color}`} /> {p.title}
                        </DialogTitle>
                      </DialogHeader>
                      
                      <div className="mt-4 flex flex-col gap-6">
                        {/* Descrição do serviço */}
                        <DialogDescription className="text-base text-foreground leading-relaxed">
                          {p.description}
                        </DialogDescription>

                        {/* Seção que exibe a foto e nome do(s) Profissional(is) */}
                        {p.team && p.team.length > 0 && (
                          <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                              Profissional Responsável
                            </h4>
                            <div className="grid gap-6 grid-cols-1">
                              {p.team.map((member, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-3 bg-slate-50 dark:bg-muted/10 p-4 rounded-xl border border-border">
                                  <img 
                                    src={member.image} 
                                    alt={`Foto de ${member.name}`} 
                                    className="max-w-full h-auto max-h-[350px] object-contain rounded-lg shadow-md border border-border/60 bg-white"
                                  />
                                  <span className="text-lg font-display font-bold text-foreground mt-1 text-center">
                                    {member.name}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>

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
            Auxílio com consultas, exames, dietas, cateteres e cestas de alimentos (sacolões) para pacientes em situação de vulnerabilidade em Cuiabá.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;