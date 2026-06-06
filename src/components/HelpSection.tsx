import { Heart, HandHeart, QrCode } from "lucide-react";
import VolunteerForm from "@/components/VolunteerForm";

const HelpSection = () => {
  return (
    <section id="ajudar" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-secondary uppercase tracking-widest">Faça Parte</span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mt-2">
            Como Ajudar
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Existem diversas formas de contribuir com a nossa causa. Cada gesto faz a diferença na vida de um paciente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Voluntário */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20 hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <HandHeart className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground">Seja Voluntário</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Junte-se aos nossos 20 voluntários, todos ex-pacientes que entendem a jornada do câncer.
              Sua experiência e dedicação podem fazer a diferença na vida de alguém.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-secondary flex-shrink-0" />
                Acolhimento de novos pacientes
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-secondary flex-shrink-0" />
                Apoio em eventos e campanhas
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-secondary flex-shrink-0" />
                Suporte administrativo
              </li>
            </ul>
            <VolunteerForm />
          </div>

          {/* Doação */}
          <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-8 border border-secondary/20 hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Heart className="w-8 h-8 text-secondary-foreground" />
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground">Doação Financeira</h3>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Sua doação ajuda a manter nossos serviços de saúde, cestas básicas,
              consultas e exames para pacientes em vulnerabilidade.
            </p>

            {/* QR Code placeholder */}
            <div className="mt-6 bg-card rounded-xl p-6 border border-border text-center">
              <QrCode className="w-32 h-32 text-foreground/30 mx-auto" />
              <p className="text-sm font-bold text-foreground mt-3">Escaneie o QR Code PIX</p>
              <p className="text-xs text-muted-foreground mt-1">CNPJ da AAPOC MT</p>
              <p className="text-xs text-muted-foreground">(QR Code será disponibilizado em breve)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpSection;
