"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { BOOKING_FACILITY_ORIGIN } from "@/lib/booking";
import {
  parseBookingGoodBookingCreated,
  trackMetaBookingSchedule,
} from "@/lib/tracking";

type Props = {
  /** Locale prefix for success redirect, e.g. "" or "/en". */
  localePrefix?: string;
};

function isEmbeddedBookingGoodFrame(source: MessageEventSource | null) {
  if (!source) {
    return false;
  }
  return Array.from(document.querySelectorAll("iframe")).some(
    (frame) =>
      frame.contentWindow === source &&
      new URL(frame.src, window.location.href).origin === BOOKING_FACILITY_ORIGIN,
  );
}

/**
 * The only booking conversion trigger on the site. Fires the Google Ads
 * conversion when the embedded BookingGood iframe posts `bg:booking-created`
 * (sent only after a persisted booking; requires `bookingSuccessRedirectUrl`
 * on the BookingGood facility), then shows the success page.
 * The success page itself never fires: a URL id is not proof of a booking.
 */
export default function BookingEmbedConversionBridge({
  localePrefix = "",
}: Props) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const fired = new Set<string>();

    const markAndFire = (id: string) => {
      if (fired.has(id)) {
        return true;
      }

      const dedupeKey = `booking_conversion_fired:${id}`;
      if (
        window.sessionStorage.getItem(dedupeKey) ||
        window.localStorage.getItem(dedupeKey)
      ) {
        fired.add(id);
        return true;
      }

      if (typeof window.gtag_report_booking_complete !== "function") {
        return false;
      }

      if (!window.gtag_report_booking_complete(id)) {
        return true;
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "booking_complete",
        booking_id: id,
        transaction_id: id,
        value: 1.0,
        currency: "EUR",
        source: "booking_embed_bridge",
      });

      trackMetaBookingSchedule(id);

      window.sessionStorage.setItem(dedupeKey, "1");
      window.localStorage.setItem(dedupeKey, "1");
      fired.add(id);

      const prefix = localePrefix.replace(/\/$/, "");
      const successPath =
        `${prefix}/booking/success?booking_id=${encodeURIComponent(id)}` as Route;
      router.push(successPath);
      return true;
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== BOOKING_FACILITY_ORIGIN) {
        return;
      }

      const bookingId = parseBookingGoodBookingCreated(event.data);
      if (!bookingId || !isEmbeddedBookingGoodFrame(event.source)) {
        return;
      }

      // Retry briefly while gtag bootstrap finishes.
      let attempts = 0;
      const tryFire = () => {
        if (markAndFire(bookingId)) {
          return;
        }
        if (attempts < 20) {
          attempts += 1;
          window.setTimeout(tryFire, 250);
        }
      };
      tryFire();
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [localePrefix, router]);

  return null;
}
