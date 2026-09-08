import { useState } from "react";

type Campaign = {
  cancer: string;
  ribbon: string;
  color: string; // hex or gradient
};

type MonthData = {
  month: string;
  short: string;
  campaigns: Campaign[];
};

const months: MonthData[] = [
  {
    month: "Janeiro",
    short: "Jan",
    campaigns: [{ cancer: "Colo do Útero", ribbon: "Verde", color: "#16a34a" }],
  },
  {
    month: "Fevereiro",
    short: "Fev",
    campaigns: [
      { cancer: "Vesícula Biliar", ribbon: "Verde", color: "#16a34a" },
      { cancer: "Leucemia", ribbon: "Laranja", color: "#f97316" },
    ],
  },
  {
    month: "Março",
    short: "Mar",
    campaigns: [
      { cancer: "Colo do Útero", ribbon: "Lilás", color: "#a855f7" },
      { cancer: "Colorretal", ribbon: "Azul Marinho", color: "#1e3a8a" },
    ],
  },
  {
    month: "Abril",
    short: "Abr",
    campaigns: [
      { cancer: "Testículo", ribbon: "Lilás", color: "#a855f7" },
      { cancer: "Esôfago", ribbon: "Azul Claro", color: "#38bdf8" },
    ],
  },
  {
    month: "Maio",
    short: "Mai",
    campaigns: [
      { cancer: "Boca (Oral)", ribbon: "Vermelho", color: "#dc2626" },
      { cancer: "Cérebro", ribbon: "Cinza", color: "#6b7280" },
    ],
  },
  {
    month: "Junho",
    short: "Jun",
    campaigns: [
      { cancer: "Rim", ribbon: "Verde", color: "#16a34a" },
      { cancer: "Melanoma", ribbon: "Preto", color: "#0a0a0a" },
    ],
  },
  {
    month: "Julho",
    short: "Jul",
    campaigns: [
      { cancer: "Cabeça e Pescoço", ribbon: "Verde", color: "#16a34a" },
      { cancer: "Bexiga", ribbon: "Rosa Claro", color: "#f9a8d4" },
      { cancer: "Ósseo", ribbon: "Amarelo", color: "#facc15" },
    ],
  },
  {
    month: "Agosto",
    short: "Ago",
    campaigns: [{ cancer: "Pulmão", ribbon: "Branco", color: "#f8fafc" }],
  },
  {
    month: "Setembro",
    short: "Set",
    campaigns: [
      { cancer: "Intestino", ribbon: "Verde", color: "#16a34a" },
      { cancer: "Infantojuvenil", ribbon: "Dourado", color: "#ca8a04" },
      { cancer: "Tireoide", ribbon: "Azul e Rosa", color: "linear-gradient(90deg,#60a5fa,#f472b6)" },
    ],
  },
  {
    month: "Outubro",
    short: "Out",
    campaigns: [
      { cancer: "Mama", ribbon: "Rosa", color: "#ec4899" },
      { cancer: "Fígado", ribbon: "Verde Escuro", color: "#14532d" },
    ],
  },
  {
    month: "Novembro",
    short: "Nov",
    campaigns: [
      { cancer: "Próstata", ribbon: "Azul", color: "#2563eb" },
      { cancer: "Pâncreas", ribbon: "Roxo", color: "#6b21a8" },
    ],
  },
  {
    month: "Dezembro",
    short: "Dez",
    campaigns: [{ cancer: "Pele (Não Melanoma)", ribbon: "Laranja", color: "#ea580c" }],
  },
];

const CalendarSection = () => {
  const currentMonth = new Date().getMonth();
  const [selected, setSelected] = useState(currentMonth);
  const active = months[selected];

  return (
    <section id="calendario" className="py-20 bg-muted/40 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-4 py-1.5 rounded-full border border-secondary/20">
            Conscientização & Prevenção
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mt-3">
            Cores do Ano
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base">
            Cada mês do ano é representado por uma cor que simboliza a luta e a conscientização contra tipos específicos de câncer.
          </p>
        </div>

        {/* Month selector - horizontal timeline */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="flex gap-2 overflow-x-auto pb-3 snap-x scrollbar-thin justify-start md:justify-center">
            {months.map((m, i) => {
              const isActive = i === selected;
              const isCurrent = i === currentMonth;
              return (
                <button
                  key={m.month}
                  onClick={() => setSelected(i)}
                  className={`relative flex-shrink-0 snap-start min-w-[70px] px-3 py-3 rounded-xl border transition-all ${
                    isActive
                      ? "bg-foreground text-background border-foreground shadow-lg scale-105"
                      : "bg-card text-foreground border-border hover:border-foreground/40"
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold tracking-wider opacity-70">
                    {m.short}
                  </div>
                  <div className="flex gap-1 justify-center mt-2">
                    {m.campaigns.map((c, idx) => (
                      <span
                        key={idx}
                        className="w-2.5 h-2.5 rounded-full ring-1 ring-black/10"
                        style={{ background: c.color }}
                      />
                    ))}
                  </div>
                  {isCurrent && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary ring-2 ring-background" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured month detail */}
        <div className="max-w-5xl mx-auto bg-card rounded-3xl shadow-xl border border-border overflow-hidden">
          <div className="grid md:grid-cols-[1fr_2fr]">
            {/* Left: month name */}
            <div className="relative p-8 md:p-10 bg-gradient-to-br from-primary/10 via-secondary/10 to-hope/10 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
                {selected === currentMonth ? "Mês atual" : "Mês selecionado"}
              </span>
              <h3 className="font-display font-black text-5xl md:text-6xl text-foreground mt-2 leading-none">
                {active.month}
              </h3>
              <p className="text-sm text-muted-foreground mt-4">
                {active.campaigns.length === 1
                  ? "1 campanha de conscientização"
                  : `${active.campaigns.length} campanhas de conscientização`}
              </p>
            </div>

            {/* Right: campaigns list */}
            <div className="p-6 md:p-8 space-y-4">
              {active.campaigns.map((c, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-border hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0">
                    <div
                      className="w-14 h-14 rounded-full ring-4 ring-background shadow-md"
                      style={{ background: c.color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                      Laço {c.ribbon}
                    </p>
                    <p className="text-lg font-display font-bold text-foreground leading-tight">
                      {c.cancer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
