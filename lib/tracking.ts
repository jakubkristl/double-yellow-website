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

/**
 * Booking id from BookingGood's documented `bg:booking-created` message, which
 * the embed posts only after the booking-creation API returned a persisted id.
 * Matches the checks in https://sport.bookinggood.net/embed/v1/booking-success.js.
 * Anything else (other types, flat shapes, strings, non-numeric ids) is ignored.
 */
export function parseBookingGoodBookingCreated(data: unknown): string | undefined {
  if (!data || typeof data !== "object") {
    return undefined;
  }
  const message = data as Record<string, unknown>;
  if (
    message.source !== "bookinggood" ||
    message.version !== 1 ||
    message.type !== "bg:booking-created"
  ) {
    return undefined;
  }
  const payload = message.payload as Record<string, unknown> | null | undefined;
  if (
    !payload ||
    typeof payload !== "object" ||
    typeof payload.bookingId !== "string" ||
    !/^[1-9]\d*$/.test(payload.bookingId) ||
    typeof payload.redirectUrl !== "string"
  ) {
    return undefined;
  }
  return payload.bookingId;
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
