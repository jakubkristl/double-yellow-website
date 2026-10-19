import Script from "next/script";
import {
  ADS_BOOKING_CONVERSION,
  ADS_ID,
  COOKIE_CONSENT_STORAGE_KEY,
  GA_MEASUREMENT_ID,
} from "@/lib/tracking";

/**
 * Consent Mode v2, then the Google tags.
 *
 * One `beforeInteractive` script runs before hydration. It queues the denied
 * default (and a stored choice, if any) before it inserts gtag.js.
 * A separate loader can be preloaded and race ahead of that command.
 *
 * `page_path` is pinned to "/": the remote AW-17840430561 Google tag has
 * Ads-created rules that turn page_view on paths starting with /booking,
 * /about or /contact into Ads conversions (Book appointment, About Us,
 * Contact Us), and those rules read page_path. GA4 reports use
 * page_location, which stays real. Booking conversions come only from
 * gtag_report_booking_complete.
 *
 * Do not load GTM (GTM-T7KDHVST) here. Its Google tag for G-BQWPYFTG6V
 * ignores the page_path pin, so alongside the Cloudflare tag gateway
 * (/6ftv/) it brings the page-view conversions back.
 *
 * Uses next/script — a raw <script> in a React tree crashes Next.js 16 client render.
 */
const consentAndTags = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });
  var ads = 'denied';
  var analytics = 'denied';
  try {
    var raw = localStorage.getItem('${COOKIE_CONSENT_STORAGE_KEY}');
    if (raw) {
      var saved = JSON.parse(raw);
      if (saved && typeof saved === 'object') {
        analytics = saved.analytics ? 'granted' : 'denied';
        ads = saved.marketing ? 'granted' : 'denied';
      }
    }
  } catch (e) {}
  if (ads === 'granted' || analytics === 'granted') {
    gtag('consent', 'update', {
      ad_storage: ads,
      ad_user_data: ads,
      ad_personalization: ads,
      analytics_storage: analytics
    });
  }
  gtag('set', 'ads_data_redaction', ads !== 'granted');
  gtag('set', 'url_passthrough', true);
  gtag('set', 'page_path', '/');
  gtag('js', new Date());
  gtag('config', '${ADS_ID}');
  gtag('config', '${GA_MEASUREMENT_ID}');
  window.gtag_report_booking_complete = function (bookingId) {
    if (!bookingId) return false;
    var id = String(bookingId).trim();
    if (!id || /^(qa|test)[-_]/i.test(id)) return false;
    gtag('event', 'conversion', {
      send_to: '${ADS_BOOKING_CONVERSION}',
      value: 1.0,
      currency: 'EUR',
      transaction_id: id
    });
    return true;
  };
  var gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=${ADS_ID}';
  document.head.appendChild(gtagScript);
`
  .replace(/\s+/g, " ")
  .trim();

export default function GoogleTracking() {
  return (
    <Script
      id="google-consent-default"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: consentAndTags }}
    />
  );
}
