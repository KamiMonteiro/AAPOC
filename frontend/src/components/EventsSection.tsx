import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ExternalLink,
  Download,
  Share2,
  RefreshCw,
  Sparkles,
  CalendarPlus,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import {
  fetchCalendarEvents,
  getGoogleCalendarLink,
  downloadEventIcs,
  AAPOC_SUBSCRIBE_URL,
  type CalendarEvent,
} from "@/lib/calendarService";

const EventsSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const {
    data: events = [],
    isLoading,
    isRefetching,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["aapoc-calendar-events"],
    queryFn: fetchCalendarEvents,
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });

  const formatEventDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = date
      .toLocaleDateString("pt-BR", { month: "short" })
      .replace(".", "")
      .toUpperCase();
    const weekday = date.toLocaleDateString("pt-BR", { weekday: "long" });
    const year = date.getFullYear();
    return { day, month, weekday, year };
  };

  const formatEventTime = (event: CalendarEvent) => {
    if (event.isAllDay) return "Dia Inteiro";
    const startStr = event.startDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (!event.endDate) return `${startStr}`;
    const endStr = event.endDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${startStr} às ${endStr}`;
  };

  const getEventBadge = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      return { label: "Hoje / Em andamento", color: "bg-red-500 text-white animate-pulse" };
    }
    if (diffDays === 1) {
      return { label: "Amanhã", color: "bg-amber-500 text-white" };
    }
    if (diffDays <= 7) {
      return { label: `Em ${diffDays} dias`, color: "bg-primary text-primary-foreground" };
    }
    return { label: "Confirmado", color: "bg-secondary/90 text-secondary-foreground" };
  };

  const handleShare = async (event: CalendarEvent) => {
    const shareText = `Participe com a AAPOC: ${event.title}\n📅 Data: ${event.startDate.toLocaleDateString("pt-BR")}\n📍 Local: ${event.location || "Cuiabá - MT"}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // User cancelled share, fallback to copy
      }
    }
    navigator.clipboard.writeText(shareText);
    setCopiedId(event.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const nextEvent = events.length > 0 ? events[0] : null;
  const remainingEvents = events.length > 1 ? events.slice(1) : [];

  return (
    <section id="eventos" className="py-20 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Centered Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-black text-foreground">
            Próximos Eventos e Ações
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-base">
            Participe de nossos encontros, palestras de prevenção, bazares beneficentes e mutirões de apoio ao paciente oncológico em Cuiabá.
          </p>

          {/* Quick Actions centered under header */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={() => refetch()}
              disabled={isRefetching}
              title="Atualizar eventos da agenda"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card hover:bg-muted/80 text-foreground text-xs md:text-sm font-semibold transition-all shadow-sm active:scale-95 disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-primary ${isRefetching ? "animate-spin" : ""}`} />
              <span>{isRefetching ? "Atualizando..." : "Atualizar Agenda"}</span>
            </button>

            <a
              href={AAPOC_SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all hover:scale-105 active:scale-95"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              <span>Inscrever-se na Agenda</span>
            </a>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="bg-card rounded-3xl border border-border p-8 animate-pulse shadow-sm">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="h-40 bg-muted rounded-2xl md:col-span-1" />
                <div className="space-y-4 md:col-span-2">
                  <div className="h-6 bg-muted rounded w-1/3" />
                  <div className="h-10 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                  <div className="h-12 bg-muted rounded w-1/3 pt-4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error / Offline Notice */}
        {!isLoading && isError && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 text-center max-w-xl mx-auto mb-10">
            <p className="text-destructive font-semibold">
              Não foi possível carregar os eventos automaticamente no momento.
            </p>
            <a
              href={AAPOC_SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary font-bold hover:underline"
            >
              Ver agenda diretamente no Google Agenda <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Empty State: When no events are in the calendar */}
        {!isLoading && events.length === 0 && (
          <div className="bg-card/80 backdrop-blur-sm border border-border/80 rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto text-center relative overflow-hidden">
            <div className="w-16 h-16 bg-gradient-to-tr from-primary/20 via-secondary/20 to-hope/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-secondary">
              Novidades em breve
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-black text-foreground mt-2 mb-4">
              Nenhuma ação pública agendada para os próximos dias
            </h3>

            <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed mb-8">
              Nossa equipe está organizando as próximas datas de palestras, acolhimentos e bazares. Você pode sincronizar nossa agenda oficial para ser avisado no seu celular assim que uma nova data for marcada!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={AAPOC_SUBSCRIBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-3.5 rounded-xl transition-all shadow-md hover:scale-105"
              >
                <CalendarPlus className="w-5 h-5" />
                Seguir Agenda Oficial
              </a>
              <a
                href="#ajudar"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-6 py-3.5 rounded-xl transition-all shadow-md hover:scale-105"
              >
                <HeartHandshake className="w-5 h-5" />
                Seja um Voluntário
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-border/60 text-xs text-muted-foreground flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Conectado em tempo real com a agenda oficial do Google (aapoccba@gmail.com)</span>
            </div>
          </div>
        )}

        {/* Populated Events View */}
        {!isLoading && events.length > 0 && (
          <div className="space-y-10 max-w-5xl mx-auto">
            {/* Spotlight / Next Major Event */}
            {nextEvent && (
              <div className="bg-card rounded-3xl border-2 border-primary/30 shadow-xl overflow-hidden hover:border-primary/50 transition-all">
                <div className="grid lg:grid-cols-12 gap-0">
                  {/* Left Date Ribbon Column */}
                  <div className="lg:col-span-4 bg-gradient-to-br from-primary via-primary/95 to-secondary text-primary-foreground p-8 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                      <CalendarIcon className="w-64 h-64" />
                    </div>

                    <div>
                      <div className="inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        <Sparkles className="w-3.5 h-3.5 text-accent" />
                        <span>Próximo Destaque</span>
                      </div>

                      {(() => {
                        const { day, month, weekday, year } = formatEventDate(nextEvent.startDate);
                        return (
                          <div>
                            <div className="text-6xl md:text-7xl font-display font-black leading-none tracking-tight">
                              {day}
                            </div>
                            <div className="text-2xl font-bold uppercase tracking-widest mt-1 text-white/90">
                              {month} <span className="text-white/60 font-normal">{year}</span>
                            </div>
                            <div className="text-sm font-semibold capitalize text-white/80 mt-2">
                              {weekday}
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/20">
                      {(() => {
                        const badge = getEventBadge(nextEvent.startDate);
                        return (
                          <span className={`inline-block px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${badge.color}`}>
                            {badge.label}
                          </span>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Right Event Content Column */}
                  <div className="lg:col-span-8 p-8 md:p-10 flex flex-col justify-between bg-card">
                    <div>
                      <h3 className="text-2xl md:text-4xl font-display font-black text-foreground leading-snug">
                        {nextEvent.title}
                      </h3>

                      {nextEvent.description && (
                        <p className="text-muted-foreground mt-4 text-base leading-relaxed whitespace-pre-line">
                          {nextEvent.description}
                        </p>
                      )}

                      <div className="grid sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                        <div className="flex items-center gap-3 text-foreground/80">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs uppercase font-bold text-muted-foreground">Horário</div>
                            <div className="font-semibold text-sm">{formatEventTime(nextEvent)}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-foreground/80">
                          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs uppercase font-bold text-muted-foreground">Local</div>
                            <div className="font-semibold text-sm truncate">
                              {nextEvent.location ? (
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nextEvent.location)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-primary underline-offset-2 hover:underline inline-flex items-center gap-1"
                                >
                                  <span>{nextEvent.location}</span>
                                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                </a>
                              ) : (
                                "Cuiabá - MT (Sede da AAPOC)"
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center gap-3">
                      <a
                        href={getGoogleCalendarLink(nextEvent)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-5 py-3 rounded-xl text-sm transition-all shadow-md hover:scale-105 active:scale-95"
                      >
                        <CalendarPlus className="w-4 h-4" />
                        <span>Adicionar ao Google Agenda</span>
                      </a>

                      <button
                        onClick={() => downloadEventIcs(nextEvent)}
                        className="inline-flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground font-semibold px-4 py-3 rounded-xl text-sm transition-all border border-border"
                        title="Baixar arquivo de convite para Apple / Outlook / Celular"
                      >
                        <Download className="w-4 h-4 text-muted-foreground" />
                        <span>Baixar iCal (.ics)</span>
                      </button>

                      <button
                        onClick={() => handleShare(nextEvent)}
                        className="inline-flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground font-semibold px-4 py-3 rounded-xl text-sm transition-all border border-border ml-auto"
                        title="Compartilhar este evento"
                      >
                        {copiedId === nextEvent.id ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="text-emerald-600">Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-4 h-4 text-muted-foreground" />
                            <span>Compartilhar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* List of Other Upcoming Events */}
            {remainingEvents.length > 0 && (
              <div>
                <h4 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                  <span>Outros Eventos Agendados</span>
                  <span className="text-xs bg-muted text-muted-foreground px-2.5 py-0.5 rounded-full font-sans font-bold">
                    {remainingEvents.length}
                  </span>
                </h4>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {remainingEvents.map((event) => {
                    const { day, month, weekday } = formatEventDate(event.startDate);
                    const badge = getEventBadge(event.startDate);

                    return (
                      <div
                        key={event.id}
                        className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between group"
                      >
                        <div>
                          {/* Card Header with Date & Badge */}
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                              <div className="bg-primary/10 text-primary border border-primary/20 rounded-xl px-3 py-2 text-center min-w-[54px]">
                                <div className="text-xl font-display font-black leading-none">{day}</div>
                                <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5">{month}</div>
                              </div>
                              <div>
                                <span className="text-xs font-semibold text-muted-foreground capitalize block">
                                  {weekday}
                                </span>
                                <span className="text-xs text-foreground/70 font-medium">
                                  {formatEventTime(event)}
                                </span>
                              </div>
                            </div>

                            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${badge.color}`}>
                              {badge.label}
                            </span>
                          </div>

                          <h5 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {event.title}
                          </h5>

                          {event.description && (
                            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                              {event.description}
                            </p>
                          )}

                          {event.location && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-4 pt-3 border-t border-border/60">
                              <MapPin className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          )}
                        </div>

                        {/* Card Footer Actions */}
                        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between gap-2">
                          <a
                            href={getGoogleCalendarLink(event)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                          >
                            <CalendarPlus className="w-3.5 h-3.5" />
                            <span>Salvar na Agenda</span>
                          </a>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => downloadEventIcs(event)}
                              title="Baixar iCal (.ics)"
                              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleShare(event)}
                              title="Compartilhar evento"
                              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;
