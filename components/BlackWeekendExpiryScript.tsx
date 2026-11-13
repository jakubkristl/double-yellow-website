import Script from "next/script";
import { BLACK_WEEKEND_CAROUSEL_ENDS_AT_MS } from "@/lib/heroSlideSchedule";

/**
 * Hides the Black Weekend slide before paint if this page was cached
 * past 08:00 Europe/Sofia on 17 November 2026. The carousel also drops
 * the slide on the client at that instant.
 *
 * next/script: a raw <script> in the React tree crashes Next.js 16.
 */
const expiryCheck = `if(Date.now()>=${BLACK_WEEKEND_CAROUSEL_ENDS_AT_MS})document.documentElement.setAttribute("data-black-weekend-ended","")`;

export default function BlackWeekendExpiryScript() {
  return (
    <Script
      id="black-weekend-carousel-expiry"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: expiryCheck }}
    />
  );
}
