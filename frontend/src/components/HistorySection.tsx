import { Heart, Users, Calendar, Home } from "lucide-react";

const HistorySection = () => {
  return (
    <section id="historia" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-secondary uppercase tracking-widest">Desde 2020</span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mt-2">
            Nossa História
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-sm border border-border">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-foreground">A AAPOC NASCE DA VONTADE DE AJUDAR AO PRÓXIMO</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  A associação nasceu da iniciativa de <strong>Janaína</strong>, ela própria uma paciente oncológica,
                  com a missão de levar <strong>dignidade, amor e esperança</strong> àqueles que enfrentam a jornada
                  do câncer em Cuiabá. Desde dezembro de 2020, a AAPOC MT acolhe e oferece assistência integral a
                  pacientes oncológicos — homens, mulheres e crianças.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="bg-primary/5 rounded-xl p-4 text-center border border-primary/10">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="font-bold text-foreground">9 diretores</div>
                <div className="text-xs text-muted-foreground">20 voluntários (ex-pacientes)</div>
              </div>
              <div className="bg-secondary/5 rounded-xl p-4 text-center border border-secondary/10">
                <Calendar className="w-8 h-8 text-secondary mx-auto mb-2" />
                <div className="font-bold text-foreground">8+ projetos</div>
                <div className="text-xs text-muted-foreground">Iniciativas ativas</div>
              </div>
              <div className="bg-hope/5 rounded-xl p-4 text-center border border-hope/10">
                <Home className="w-8 h-8 text-hope mx-auto mb-2" />
                <div className="font-bold text-foreground">Casa Transitória</div>
                <div className="text-xs text-muted-foreground">"Carmen Lúcia Perez de Faria"</div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-border">
              <h4 className="font-display font-bold text-foreground text-lg">🏠 Projeto 2026</h4>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                <strong>Nossa Casa Transitória para Pacientes Oncológicos "Carmen Lúcia Perez de Faria"</strong> —
                um novo lar temporário para acolher pacientes de outras cidades que precisam se deslocar até Cuiabá para tratamento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
