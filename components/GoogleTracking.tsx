import { ADS_BOOKING_CONVERSION, GTM_ID } from "@/lib/tracking";

/**
 * Consent Mode defaults + GTM. Google Ads conversions are not configured on
 * page load; they fire only from BookingSuccessTracker when a booking id exists.
 */
export default function GoogleTracking() {
  const bootstrap = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500
    });
    gtag('js', new Date());
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
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
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: bootstrap.replace(/\s+/g, " ").trim() }}
    />
  );
}

export function GoogleTagManagerNoscript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
