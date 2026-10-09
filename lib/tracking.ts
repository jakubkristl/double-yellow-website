export const GTM_ID = "GTM-T7KDHVST";
export const GA_MEASUREMENT_ID = "G-BQWPYFTG6V";
export const ADS_ID = "AW-17840430561";

/**
 * Google Ads booking conversion send_to.
 * Must match the conversion action label in Google Ads AND BookingGood
 * facility config `gtagSendTo` (currently Vnw5… on facility 44/72).
 * Do not change without updating BookingGood admin + Ads UI together.
 */
export const ADS_BOOKING_CONVERSION_LABEL = "Vnw5CK6LvOAbEOG7_bpC";
export const ADS_BOOKING_CONVERSION = `${ADS_ID}/${ADS_BOOKING_CONVERSION_LABEL}`;

/** Alternate label that existed only in undeployed main — verify in Ads before re-enabling. */
export const ADS_BOOKING_CONVERSION_LABEL_UNDEPLOYED = "x2DUCNSS1fMcEOG7_bpC";

export const COOKIE_CONSENT_STORAGE_KEY = "cookieConsent";

export const BOOKING_GOOD_ORIGINS = [
  "https://sport.bookinggood.net",
  "https://www.bookinggood.net",
  "https://bookinggood.net",
] as const;

export type CookieConsentPreferences = {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    gtag_report_booking_complete?: (bookingId?: string) => boolean;
  }
}

export function isBookingGoodOrigin(origin: string): boolean {
  return (BOOKING_GOOD_ORIGINS as readonly string[]).includes(origin);
}

export function isUsableBookingId(bookingId: unknown): bookingId is string {
  if (typeof bookingId !== "string") {
    return false;
  }
  const id = bookingId.trim();
  if (!id) {
    return false;
  }
  if (/^(qa|test)[-_]/i.test(id)) {
    return false;
  }
  return true;
}

/**
 * Pull a booking id out of BookingGood (or similar) postMessage payloads.
 * Shapes are defensive — BookingGood's public embed does not document a stable
 * success message today; this accepts common id field names if they add one.
 */
export function extractBookingIdFromMessage(data: unknown): string | undefined {
  if (data == null) {
    return undefined;
  }

  if (typeof data === "string") {
    try {
      return extractBookingIdFromMessage(JSON.parse(data));
    } catch {
      const trimmed = data.trim();
      return isUsableBookingId(trimmed) ? trimmed : undefined;
    }
  }

  if (typeof data !== "object") {
    return undefined;
  }

  const record = data as Record<string, unknown>;
  const nested =
    record.data && typeof record.data === "object"
      ? (record.data as Record<string, unknown>)
      : undefined;
  const payload =
    record.payload && typeof record.payload === "object"
      ? (record.payload as Record<string, unknown>)
      : undefined;
  const booking =
    record.booking && typeof record.booking === "object"
      ? (record.booking as Record<string, unknown>)
      : undefined;

  const candidates = [
    record.booking_id,
    record.bookingId,
    record.reservation_id,
    record.reservationId,
    record.transaction_id,
    record.transactionId,
    record.id,
    nested?.booking_id,
    nested?.bookingId,
    nested?.reservation_id,
    nested?.reservationId,
    nested?.id,
    payload?.booking_id,
    payload?.bookingId,
    payload?.reservation_id,
    payload?.id,
    booking?.id,
    booking?.booking_id,
  ];

  for (const candidate of candidates) {
    if (isUsableBookingId(candidate)) {
      return candidate.trim();
    }
  }

  const type = String(record.type ?? record.event ?? record.name ?? "").toLowerCase();
  const looksLikeSuccess =
    /booking.*(success|complete|created|confirmed)|reservation.*(success|complete|created|confirmed)/.test(
      type,
    );

  if (looksLikeSuccess && isUsableBookingId(record.value)) {
    return record.value.trim();
  }

  return undefined;
}

export function applyGoogleConsent(prefs: CookieConsentPreferences) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  const gtag =
    window.gtag ||
    function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  window.gtag = gtag;

  gtag("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.marketing ? "granted" : "denied",
    ad_user_data: prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.marketing ? "granted" : "denied",
  });
}
