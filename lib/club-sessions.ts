/**
 * Public BookingGood events calendar for facility 44 / item 717.
 * Read-only. This module never creates a reservation.
 */
export const CLUB_EVENTS_EMBED_URL =
  "https://sport.bookinggood.net/bg/embed/facility/44/717?theme=dark";

const SESSION_TITLES = ["Mini squash", "Social squash"] as const;
export type ClubSessionTitle = (typeof SESSION_TITLES)[number];

/**
 * Length of a session when the public calendar only prints the start time.
 * Mini squash 10:00 is 60 minutes and Social squash 18:00 is 120 minutes,
 * from the club's stated hours and the weekly schedule on the public page.
 * Any other start time stays a start time only.
 */
const SESSION_LENGTH_MINUTES: Record<ClubSessionTitle, Record<string, number>> = {
  "Mini squash": { "10:00": 60 },
  "Social squash": { "18:00": 120 },
};

export type ClubSession = {
  id: string;
  title: ClubSessionTitle;
  date: string;
  start: string;
  end: string | null;
  placesLeft: number;
  priceEur: number | null;
  perPerson: boolean;
  bookable: boolean;
};

export type ClubSessionsResult = {
  slots: ClubSession[];
  error: "unavailable" | null;
};

type SofiaStamp = { date: string; time: string };

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function sofiaStamp(now: Date): SofiaStamp {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Sofia",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const read = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";
  return {
    date: `${read("year")}-${read("month")}-${read("day")}`,
    time: `${read("hour")}:${read("minute")}`,
  };
}

function calendarDate(day: number, month: number, now: Date): string | null {
  const today = sofiaStamp(now).date;
  const year = Number(today.slice(0, 4));
  const todayUtc = Date.parse(today);
  let best: { iso: string; distance: number } | null = null;
  for (const candidateYear of [year - 1, year, year + 1]) {
    const iso = `${candidateYear}-${pad(month)}-${pad(day)}`;
    const distanceDays = Math.round((Date.parse(iso) - todayUtc) / 86_400_000);
    if (distanceDays < -1 || distanceDays > 21) continue;
    const distance = Math.abs(distanceDays);
    if (!best || distance < best.distance) best = { iso, distance };
  }
  return best?.iso ?? null;
}

function addMinutes(start: string, minutes: number): string {
  const [hour, minute] = start.split(":").map(Number);
  const total = hour * 60 + minute + minutes;
  return `${pad(Math.floor(total / 60) % 24)}:${pad(total % 60)}`;
}

function canonicalTitle(value: string): ClubSessionTitle | null {
  const match = SESSION_TITLES.find((title) => title.toLowerCase() === value.toLowerCase());
  return match ?? null;
}

function stripTags(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseSlot(buttonHtml: string, date: string): ClubSession | null {
  const text = stripTags(buttonHtml);
  const time = text.match(/\b(\d{2}:\d{2})\b/)?.[1];
  const title = canonicalTitle(text.match(/Mini squash|Social squash/i)?.[0] ?? "");
  const places = text.match(/(\d+)\s*(?:своб\.?|left\b)/i)?.[1];
  if (!time || !title || places == null) return null;
  const placesLeft = Number(places);
  const priceMatch = text.match(/(\d+(?:[.,]\d+)?)\s*€/);
  const priceEur = priceMatch ? Number(priceMatch[1].replace(",", ".")) : null;
  const length = SESSION_LENGTH_MINUTES[title][time];
  return {
    id: `${date}T${time}-${title === "Mini squash" ? "mini" : "social"}`,
    title,
    date,
    start: time,
    end: length ? addMinutes(time, length) : null,
    placesLeft,
    priceEur: Number.isFinite(priceEur) ? priceEur : null,
    perPerson: /на човек|per person/i.test(text),
    bookable: placesLeft > 0 && !/unavailable/i.test(buttonHtml),
  };
}

/** Upcoming Mini squash and Social squash rows from a public events calendar page. */
export function parseClubSessionsHtml(html: string, now = new Date()): ClubSession[] {
  const tables = html.match(/<table\b[^>]*>[\s\S]*?<\/table>/gi) ?? [];
  const table = tables.find((candidate) => /Mini squash|Social squash/i.test(candidate));
  if (!table) return [];

  const headerHtml = table.match(/<thead\b[^>]*>[\s\S]*?<\/thead>/i)?.[0] ?? "";
  const dates = [...headerHtml.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/gi)].map((match) => {
    const dayMonth = stripTags(match[1]).match(/(\d{2})\.(\d{2})/);
    if (!dayMonth) return null;
    return calendarDate(Number(dayMonth[1]), Number(dayMonth[2]), now);
  });

  const body = table.match(/<tbody\b[^>]*>[\s\S]*?<\/tbody>/i)?.[0] ?? table;
  const slots: ClubSession[] = [];
  const today = sofiaStamp(now);
  for (const row of body.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = [...row[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)];
    cells.forEach((cell, index) => {
      const date = dates[index];
      const button = cell[1].match(/<button\b[^>]*>[\s\S]*?<\/button>/i)?.[0];
      if (!date || !button) return;
      const slot = parseSlot(button, date);
      if (!slot) return;
      const upcoming =
        slot.date > today.date || (slot.date === today.date && slot.start >= today.time);
      if (!upcoming) return;
      slots.push(slot);
    });
  }

  return slots.sort((a, b) => `${a.date}T${a.start}`.localeCompare(`${b.date}T${b.start}`));
}

/** The live session for a booking address, or null when the date and time are not on the calendar. */
export function findClubSession(
  slots: ClubSession[],
  date?: string | null,
  time?: string | null,
): ClubSession | null {
  if (!date || !time) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return null;
  return slots.find((slot) => slot.date === date && slot.start === time) ?? null;
}

export async function loadClubSessions(now = new Date()): Promise<ClubSessionsResult> {
  try {
    const response = await fetch(CLUB_EVENTS_EMBED_URL, {
      headers: { Accept: "text/html" },
      next: { revalidate: 60 },
    });
    if (!response.ok) return { slots: [], error: "unavailable" };
    return { slots: parseClubSessionsHtml(await response.text(), now), error: null };
  } catch {
    return { slots: [], error: "unavailable" };
  }
}
