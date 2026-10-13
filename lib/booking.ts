/** Canonical BookingGood facility embed used across the site. */
export const BOOKING_FACILITY_PATH = "/bg/embed/facility/44/72";
export const BOOKING_FACILITY_ORIGIN = "https://sport.bookinggood.net";

export type BookingQuery = {
  day?: string | null;
  time?: string | null;
  theme?: "dark" | "light";
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
  if (query.time) params.set("time", query.time);
  return `${BOOKING_FACILITY_ORIGIN}${BOOKING_FACILITY_PATH}?${params.toString()}`;
}
