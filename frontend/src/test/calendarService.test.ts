import { describe, it, expect } from "vitest";
import { parseIcsContent } from "../lib/calendarService";

describe("calendarService - Real Google Calendar Feed Test", () => {
  it("should parse real Google Calendar Dia A event", () => {
    const realFeed = `BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:aapoccba@gmail.com
X-WR-TIMEZONE:America/Campo_Grande
BEGIN:VEVENT
DTSTART:20260829T123000Z
DTEND:20260829T160000Z
DTSTAMP:20260829T154700Z
UID:6srgc410ho3hdtnlkg4n5rums7@google.com
CLASS:PUBLIC
CREATED:20260829T153301Z
LAST-MODIFIED:20260829T154658Z
LOCATION:AAPOC (Associação de Apoio aos Pacientes Oncológicos de Cuiabá)\\, 
 Av. São Sebastião\\, 4160 - São Mateus\\, Cuiabá - MT\\, 78045-000\\, Brasil
SEQUENCE:0
STATUS:CONFIRMED
SUMMARY:Dia A
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR`;

    const events = parseIcsContent(realFeed);
    expect(events.length).toBe(1);
    expect(events[0].title).toBe("Dia A");
    expect(events[0].location).toContain("Av. São Sebastião, 4160");
    expect(events[0].startDate).toBeInstanceOf(Date);
  });
});
