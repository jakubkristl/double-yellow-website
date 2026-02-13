export const DOUBLE_YELLOW_OPEN_POSTER = "/events/double-yellow-open-tournament.png";
export const DOUBLE_YELLOW_OPEN_EXPIRES_AT = new Date("2026-03-16T23:59:59+02:00");
export const DOUBLE_YELLOW_OPEN_URL = "https://www.rankedin.com/en/tournament/64627/double-yellow-open";

export function isDoubleYellowOpenActive() {
  return new Date() < DOUBLE_YELLOW_OPEN_EXPIRES_AT;
}