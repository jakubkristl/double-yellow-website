export const SOFIA_TIME_ZONE = "Europe/Sofia";

/**
 * Black Weekend carousel graphic is removed at this Sofia wall-clock time.
 * 17 November 2026 is EET (UTC+2), so this is 06:00:00.000Z.
 */
export const BLACK_WEEKEND_CAROUSEL_ENDS_AT = "2026-11-17T08:00:00";

export type ScheduledSlide = {
  startsOn?: string;
  endsOn?: string;
  /** UTC milliseconds. The slide is gone at this instant and after. */
  endsAtMs?: number;
};

export function sofiaDateKey(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: SOFIA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]),
  );
  return `${values.year}-${values.month}-${values.day}`;
}

function sofiaOffsetMinutes(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SOFIA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]),
  );
  let year = Number(values.year);
  let month = Number(values.month);
  let day = Number(values.day);
  let hour = Number(values.hour);
  if (hour === 24) {
    hour = 0;
    const bumped = new Date(Date.UTC(year, month - 1, day) + 86_400_000);
    year = bumped.getUTCFullYear();
    month = bumped.getUTCMonth() + 1;
    day = bumped.getUTCDate();
  }
  const wallAsUtc = Date.UTC(
    year,
    month - 1,
    day,
    hour,
    Number(values.minute),
    Number(values.second),
  );
  return Math.round((wallAsUtc - date.getTime()) / 60_000);
}

/** Convert a Sofia wall clock `YYYY-MM-DDTHH:mm:ss` to UTC milliseconds. */
export function sofiaWallClockToUtcMs(wallClock: string): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/.exec(wallClock);
  if (!match) {
    throw new Error(`Invalid Sofia wall clock: ${wallClock}`);
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = Number(match[6]);
  const labeledUtc = Date.UTC(year, month - 1, day, hour, minute, second);
  const firstOffset = sofiaOffsetMinutes(new Date(labeledUtc));
  let utc = labeledUtc - firstOffset * 60_000;
  const corrected = sofiaOffsetMinutes(new Date(utc));
  if (corrected !== firstOffset) {
    utc = labeledUtc - corrected * 60_000;
  }
  return utc;
}

export const BLACK_WEEKEND_CAROUSEL_ENDS_AT_MS = sofiaWallClockToUtcMs(
  BLACK_WEEKEND_CAROUSEL_ENDS_AT,
);

export function isSlideActive(slide: ScheduledSlide, now: Date = new Date()): boolean {
  const today = sofiaDateKey(now);
  if (slide.startsOn && slide.startsOn > today) return false;
  if (slide.endsAtMs !== undefined && now.getTime() >= slide.endsAtMs) return false;
  if (slide.endsOn && slide.endsOn < today) return false;
  return true;
}

export function selectActiveSlides<T extends ScheduledSlide>(
  slides: readonly T[],
  now: Date = new Date(),
): T[] {
  const active = slides.filter((slide) => isSlideActive(slide, now));
  if (active.length > 0) return active;
  return slides.filter((slide) => !slide.endsOn && slide.endsAtMs === undefined);
}

/**
 * Shop and membership sale. It ends at the same instant as the Black Weekend
 * carousel slide. At that millisecond the sale price is gone.
 */
export function isBlackWeekendSaleActive(now: Date = new Date()): boolean {
  return now.getTime() < BLACK_WEEKEND_CAROUSEL_ENDS_AT_MS;
}

/** 10% off a shelf price, rounded to the nearest cent. */
export function tenPercentOff(shelfEur: number): number {
  const cents = Math.round(shelfEur * 100);
  return Math.round(cents * 0.9) / 100;
}

/**
 * Fixed sale prices. These are not a 10% cut.
 * Y-TEC PRO 120 is an Unsquashable racket, but its sale price is €79, not 10% of €99.
 */
export const BLACK_WEEKEND_SPECIAL_OFFERS: Record<string, { shelfEur: number; saleEur: number }> = {
  "Unsquashable Y-TEC PRO 120": { shelfEur: 99, saleEur: 79 },
  "Head Radical Junior": { shelfEur: 49, saleEur: 39 },
};

export type BlackWeekendOffer = {
  saleEur: number;
  specialOffer: boolean;
};

export function blackWeekendStoreOffer(
  categoryTitle: string,
  name: string,
  shelfEur: number,
  now: Date = new Date(),
): BlackWeekendOffer | null {
  if (!isBlackWeekendSaleActive(now)) return null;

  const special = BLACK_WEEKEND_SPECIAL_OFFERS[name];
  if (special) {
    return { saleEur: special.saleEur, specialOffer: true };
  }

  if (categoryTitle === "Rackets" && name.startsWith("Unsquashable ")) {
    return { saleEur: tenPercentOff(shelfEur), specialOffer: false };
  }

  return null;
}

/** 10% off a club-card shelf price during the same window. */
export function blackWeekendCardSaleEur(shelfEur: number, now: Date = new Date()): number | null {
  if (!isBlackWeekendSaleActive(now)) return null;
  return tenPercentOff(shelfEur);
}
