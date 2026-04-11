const months = [
  { month: "Janeiro", color: "bg-green-600", text: "text-green-600", cancer: "Câncer de Colo do Útero", ribbon: "Verde" },
  { month: "Fevereiro", color: "bg-orange-500", text: "text-orange-500", cancer: "Leucemia", ribbon: "Laranja" },
  { month: "Março", color: "bg-blue-800", text: "text-blue-800", cancer: "Câncer Colorretal", ribbon: "Azul Marinho" },
  { month: "Abril", color: "bg-blue-400", text: "text-blue-400", cancer: "Câncer de Esôfago", ribbon: "Azul Claro" },
  { month: "Maio", color: "bg-gray-500", text: "text-gray-500", cancer: "Câncer de Cérebro", ribbon: "Cinza" },
  { month: "Junho", color: "bg-red-600", text: "text-red-600", cancer: "Câncer de Pele (Melanoma)", ribbon: "Vermelho" },
  { month: "Julho", color: "bg-yellow-500", text: "text-yellow-500", cancer: "Câncer Ósseo / Sarcoma", ribbon: "Amarelo" },
  { month: "Agosto", color: "bg-lime-500", text: "text-lime-500", cancer: "Linfoma", ribbon: "Verde Limão" },
  { month: "Setembro", color: "bg-amber-600", text: "text-amber-600", cancer: "Câncer Infantil", ribbon: "Dourado" },
  { month: "Outubro", color: "bg-pink-500", text: "text-pink-500", cancer: "Câncer de Mama", ribbon: "Rosa" },
  { month: "Novembro", color: "bg-sky-500", text: "text-sky-500", cancer: "Câncer de Próstata", ribbon: "Azul" },
  { month: "Dezembro", color: "bg-orange-600", text: "text-orange-600", cancer: "Câncer de Pele", ribbon: "Laranja" },
];

const CalendarSection = () => {
  const currentMonth = new Date().getMonth();

  return (
    <section id="calendario" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-bold text-secondary uppercase tracking-widest">Conscientização</span>
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground mt-2">
            Cores do Ano
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Cada mês do ano é representado por uma cor que simboliza a luta contra um tipo específico de câncer.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {months.map((m, i) => (
            <div
              key={m.month}
              className={`relative bg-card rounded-xl p-4 shadow-sm border transition-all hover:shadow-lg hover:-translate-y-1 ${
                i === currentMonth ? "ring-2 ring-primary ring-offset-2" : "border-border"
              }`}
            >
              {i === currentMonth && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  Agora
                </span>
              )}
              <div className={`w-10 h-10 ${m.color} rounded-full mx-auto mb-3 shadow-md`} />
              <h3 className="font-bold text-sm text-foreground text-center">{m.month}</h3>
              <p className={`text-xs font-semibold text-center mt-1 ${m.text}`}>{m.ribbon}</p>
              <p className="text-xs text-muted-foreground text-center mt-1 leading-tight">{m.cancer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
