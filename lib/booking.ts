/** Canonical BookingGood facility embed used across the site. */
export const BOOKING_FACILITY_PATH = "/bg/embed/facility/44/72";
/** Events product (Mini squash and Social squash), facility item 717. */
export const BOOKING_EVENTS_PATH = "/bg/embed/facility/44/717";
export const BOOKING_FACILITY_ORIGIN = "https://sport.bookinggood.net";

export type BookingFacility = "courts" | "events";

export type BookingQuery = {
  day?: string | null;
  /** Calendar date for one events session, YYYY-MM-DD. */
  date?: string | null;
  time?: string | null;
  theme?: "dark" | "light";
  facility?: BookingFacility | null;
};

/** In-site booking route so conversion bridge + success page can fire. */
export function getSiteBookingHref(query: BookingQuery = {}) {
  const params = new URLSearchParams();
  if (query.day) params.set("day", query.day);
  if (query.time) params.set("time", query.time);
  const qs = params.toString();
  return qs ? `/booking?${qs}` : "/booking";
}

/** BookingGood iframe/src used by /booking (kept on-site for ads attribution). */
export function getBookingEmbedSrc(query: BookingQuery = {}) {
  const params = new URLSearchParams();
  params.set("theme", query.theme ?? "dark");
  if (query.day) params.set("day", query.day);
  if (query.date) params.set("date", query.date);
  if (query.time) params.set("time", query.time);
  const path = query.facility === "events" ? BOOKING_EVENTS_PATH : BOOKING_FACILITY_PATH;
  return `${BOOKING_FACILITY_ORIGIN}${path}?${params.toString()}`;
}

export function getEventsBookingHref(locale: "bg" | "en" = "bg") {
  const path = locale === "en" ? "/en/booking" : "/booking";
  return `${path}?facility=events#event-calendar`;
}

/** One Mini squash or Social squash session in the events booking (facility 717). */
export function getEventSlotBookingHref(
  locale: "bg" | "en",
  slot: { date: string; start: string },
) {
  const path = locale === "en" ? "/en/booking" : "/booking";
  const params = new URLSearchParams({
    facility: "events",
    date: slot.date,
    time: slot.start,
  });
  return `${path}?${params.toString()}`;
}
