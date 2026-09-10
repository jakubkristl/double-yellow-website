export const GTM_ID = "GTM-T7KDHVST";
export const GA_MEASUREMENT_ID = "G-BQWPYFTG6V";
export const ADS_ID = "AW-17840430561";
export const ADS_BOOKING_CONVERSION = `${ADS_ID}/x2DUCNSS1fMcEOG7_bpC`;

export const COOKIE_CONSENT_STORAGE_KEY = "cookieConsent";

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
