export const GTM_ID = "GTM-T7KDHVST";
export const GA_MEASUREMENT_ID = "G-BQWPYFTG6V";
export const ADS_ID = "AW-17840430561";
/** Double Yellow Meta (Facebook) Pixel — Events Manager dataset. */
export const META_PIXEL_ID = "802605438807678";

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

type FbqFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: (...args: unknown[]) => void;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    gtag_report_booking_complete?: (bookingId?: string) => boolean;
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}

let metaPixelInitialized = false;

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

  const ads = prefs.marketing ? "granted" : "denied";
  const analytics = prefs.analytics ? "granted" : "denied";

  gtag("consent", "update", {
    analytics_storage: analytics,
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  });
  gtag("set", "ads_data_redaction", ads !== "granted");
}

function ensureMetaPixelStub() {
  if (typeof window === "undefined" || window.fbq) {
    return window.fbq;
  }

  const fbq: FbqFunction = function (...args: unknown[]) {
    if (fbq.callMethod) {
      fbq.callMethod(...args);
    } else {
      (fbq.queue = fbq.queue || []).push(args);
    }
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;
  return fbq;
}

function injectMetaPixelScript() {
  if (typeof document === "undefined") {
    return;
  }
  if (document.getElementById("meta-pixel-script")) {
    return;
  }

  const script = document.createElement("script");
  script.id = "meta-pixel-script";
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const first = document.getElementsByTagName("script")[0];
  first?.parentNode?.insertBefore(script, first);
}

/**
 * Load and initialize Meta Pixel only after marketing consent.
 * Revokes Meta consent if marketing is later denied.
 */
export function applyMetaPixelConsent(prefs: CookieConsentPreferences) {
  if (typeof window === "undefined" || !META_PIXEL_ID) {
    return;
  }

  if (prefs.marketing) {
    const fbq = ensureMetaPixelStub();
    if (!fbq) {
      return;
    }

    if (!metaPixelInitialized) {
      injectMetaPixelScript();
      fbq("consent", "grant");
      fbq("init", META_PIXEL_ID);
      fbq("track", "PageView");
      metaPixelInitialized = true;
      return;
    }

    fbq("consent", "grant");
    return;
  }

  if (metaPixelInitialized && window.fbq) {
    window.fbq("consent", "revoke");
  }
}

export function trackMetaPageView() {
  if (typeof window === "undefined" || !metaPixelInitialized || !window.fbq) {
    return;
  }
  window.fbq("track", "PageView");
}

export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined" || !metaPixelInitialized || !window.fbq) {
    return;
  }
  if (params) {
    window.fbq("track", eventName, params);
  } else {
    window.fbq("track", eventName);
  }
}

/** Fire Meta Schedule for a confirmed court booking (marketing consent required). */
export function trackMetaBookingSchedule(bookingId: string) {
  trackMetaEvent("Schedule", {
    content_name: "Court booking",
    value: 1.0,
    currency: "EUR",
    order_id: bookingId,
  });
}

/**
 * Intro / lesson lead — Google Ads + GA4 generate_lead + Meta Lead.
 * No-ops quietly when tags are not ready or marketing consent is off.
 */
export function trackLeadConversion(source: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "generate_lead",
    lead_source: source,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      currency: "EUR",
      value: 1.0,
      lead_source: source,
    });
  }

  trackMetaEvent("Lead", {
    content_name: source,
    currency: "EUR",
    value: 1.0,
  });
}

/** Apply Google Consent Mode + Meta Pixel based on cookie preferences. */
export function applyCookieConsent(prefs: CookieConsentPreferences) {
  applyGoogleConsent(prefs);
  applyMetaPixelConsent(prefs);
}

export function readStoredCookieConsent(): CookieConsentPreferences | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as CookieConsentPreferences;
    return {
      essential: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
    };
  } catch {
    return null;
  }
}
