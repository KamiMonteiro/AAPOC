export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  isAllDay: boolean;
  rawStartDate: string;
  rawEndDate?: string;
}

export const AAPOC_CALENDAR_EMAIL = "aapoccba@gmail.com";
export const AAPOC_ICAL_URL = "https://calendar.google.com/calendar/ical/aapoccba%40gmail.com/public/basic.ics";
export const AAPOC_SUBSCRIBE_URL = `https://calendar.google.com/calendar/r?cid=${encodeURIComponent(AAPOC_CALENDAR_EMAIL)}`;

function unfoldIcal(raw: string): string {
  return raw.replace(/\r\n[ \t]/g, "").replace(/\n[ \t]/g, "");
}

function unescapeIcalText(text: string): string {
  return text
    .replace(/\\n/g, "\n")
    .replace(/\\N/g, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

function parseIcalDate(dateStr: string): { date: Date; isAllDay: boolean } {
  const cleanStr = dateStr.trim();

  // All day event: YYYYMMDD
  if (/^\d{8}$/.test(cleanStr)) {
    const year = parseInt(cleanStr.slice(0, 4), 10);
    const month = parseInt(cleanStr.slice(4, 6), 10) - 1;
    const day = parseInt(cleanStr.slice(6, 8), 10);
    return { date: new Date(year, month, day, 0, 0, 0), isAllDay: true };
  }

  // UTC Date Time: YYYYMMDDTHHmmssZ
  if (/^\d{8}T\d{6}Z$/.test(cleanStr)) {
    const year = parseInt(cleanStr.slice(0, 4), 10);
    const month = parseInt(cleanStr.slice(4, 6), 10) - 1;
    const day = parseInt(cleanStr.slice(6, 8), 10);
    const hours = parseInt(cleanStr.slice(9, 11), 10);
    const minutes = parseInt(cleanStr.slice(11, 13), 10);
    const seconds = parseInt(cleanStr.slice(13, 15), 10);
    return { date: new Date(Date.UTC(year, month, day, hours, minutes, seconds)), isAllDay: false };
  }

  // Local Date Time: YYYYMMDDTHHmmss
  if (/^\d{8}T\d{6}$/.test(cleanStr)) {
    const year = parseInt(cleanStr.slice(0, 4), 10);
    const month = parseInt(cleanStr.slice(4, 6), 10) - 1;
    const day = parseInt(cleanStr.slice(6, 8), 10);
    const hours = parseInt(cleanStr.slice(9, 11), 10);
    const minutes = parseInt(cleanStr.slice(11, 13), 10);
    const seconds = parseInt(cleanStr.slice(13, 15), 10);
    return { date: new Date(year, month, day, hours, minutes, seconds), isAllDay: false };
  }

  const parsed = new Date(cleanStr);
  return { date: isNaN(parsed.getTime()) ? new Date() : parsed, isAllDay: false };
}

export function parseIcsContent(icsContent: string): CalendarEvent[] {
  const unfolded = unfoldIcal(icsContent);
  const lines = unfolded.split(/\r\n|\n|\r/);

  const events: CalendarEvent[] = [];
  let inEvent = false;
  let currentEvent: Partial<CalendarEvent> = {};

  for (const line of lines) {
    if (line.startsWith("BEGIN:VEVENT")) {
      inEvent = true;
      currentEvent = {};
      continue;
    }

    if (line.startsWith("END:VEVENT")) {
      inEvent = false;
      if (currentEvent.title && currentEvent.startDate) {
        events.push({
          id: currentEvent.id || Math.random().toString(36).substring(2, 9),
          title: currentEvent.title,
          description: currentEvent.description || "",
          location: currentEvent.location || "",
          startDate: currentEvent.startDate,
          endDate: currentEvent.endDate,
          isAllDay: currentEvent.isAllDay ?? false,
          rawStartDate: currentEvent.rawStartDate || "",
          rawEndDate: currentEvent.rawEndDate,
        });
      }
      currentEvent = {};
      continue;
    }

    if (!inEvent) continue;

    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const fullKey = line.slice(0, colonIndex);
    const value = line.slice(colonIndex + 1);
    const mainKey = fullKey.split(";")[0].toUpperCase();

    switch (mainKey) {
      case "UID":
        currentEvent.id = value.trim();
        break;
      case "SUMMARY":
        currentEvent.title = unescapeIcalText(value);
        break;
      case "DESCRIPTION":
        currentEvent.description = unescapeIcalText(value);
        break;
      case "LOCATION":
        currentEvent.location = unescapeIcalText(value);
        break;
      case "DTSTART": {
        const { date, isAllDay } = parseIcalDate(value);
        currentEvent.startDate = date;
        currentEvent.isAllDay = isAllDay;
        currentEvent.rawStartDate = value;
        break;
      }
      case "DTEND": {
        const { date } = parseIcalDate(value);
        currentEvent.endDate = date;
        currentEvent.rawEndDate = value;
        break;
      }
      default:
        break;
    }
  }

  const now = new Date();
  const threshold = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  return events
    .filter((ev) => ev.startDate >= threshold || (ev.endDate && ev.endDate >= threshold))
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}

async function fetchWithTimeout(url: string, timeoutMs = 3500): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "text/calendar, text/plain, */*",
      },
    });
    clearTimeout(timer);
    if (!response.ok) return null;
    const text = await response.text();
    if (text && text.includes("BEGIN:VCALENDAR")) {
      return text;
    }
    return null;
  } catch {
    return null;
  }
}

export async function fetchCalendarEvents(): Promise<CalendarEvent[]> {
  const endpoints = [
    "/api/calendar-feed",
    AAPOC_ICAL_URL,
  ];

  for (const endpoint of endpoints) {
    const content = await fetchWithTimeout(endpoint, 3000);
    if (content) {
      return parseIcsContent(content);
    }
  }

  return [];
}

export function getGoogleCalendarLink(event: CalendarEvent): string {
  const formatGCalDate = (d: Date, isAllDay: boolean) => {
    if (isAllDay) {
      return d.toISOString().replace(/[-:]/g, "").slice(0, 8);
    }
    return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  };

  const startStr = formatGCalDate(event.startDate, event.isAllDay);
  const endStr = event.endDate
    ? formatGCalDate(event.endDate, event.isAllDay)
    : formatGCalDate(new Date(event.startDate.getTime() + 60 * 60 * 1000), event.isAllDay);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${startStr}/${endStr}`,
    details: event.description || "Evento organizado pela AAPOC (Associação de Apoio aos Pacientes Oncológicos de Cuiabá).",
    location: event.location || "Cuiabá - MT",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadEventIcs(event: CalendarEvent): void {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const formatDate = (d: Date) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

  const icsString = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AAPOC//Agenda de Eventos//PT",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.id}@aapoc.org.br`,
    `SUMMARY:${event.title.replace(/\n/g, "\\n")}`,
    `DESCRIPTION:${(event.description || "").replace(/\n/g, "\\n")}`,
    `LOCATION:${(event.location || "").replace(/\n/g, "\\n")}`,
    `DTSTART:${formatDate(event.startDate)}`,
    event.endDate ? `DTEND:${formatDate(event.endDate)}` : "",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  const blob = new Blob([icsString], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", `${event.title.toLowerCase().replace(/[^a-z0-9]/g, "_")}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
