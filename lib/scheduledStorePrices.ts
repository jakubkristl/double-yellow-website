/** Racket rental on the public store. Court slot prices live in BookingGood, not here. */

export const SOFIA_TIME_ZONE = "Europe/Sofia";
/** Inclusive Sofia calendar day. Active from 00:00 Europe/Sofia. */
export const STORE_PRICE_SCHEDULE_START = "2026-11-01";
export const RACKET_RENTAL_NAME = "Racket Rental";
export const CURRENT_RACKET_RENTAL_EUR = 2.5;
export const SCHEDULED_RACKET_RENTAL_EUR = 3;

export function sofiaDateKey(date: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: SOFIA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function isStorePriceScheduleActive(now: Date = new Date()): boolean {
  return sofiaDateKey(now) >= STORE_PRICE_SCHEDULE_START;
}

/** Catalog price until 1 Nov 2026 00:00 Europe/Sofia, then €3 for racket rental only. */
export function listedStorePriceEur(name: string, catalogPrice: number, now: Date = new Date()): number {
  if (name !== RACKET_RENTAL_NAME || !isStorePriceScheduleActive(now)) {
    return catalogPrice;
  }
  return SCHEDULED_RACKET_RENTAL_EUR;
}
