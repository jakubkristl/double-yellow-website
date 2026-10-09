"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import {
  extractBookingIdFromMessage,
  isBookingGoodOrigin,
  isUsableBookingId,
} from "@/lib/tracking";

type Props = {
  /** Locale prefix for success redirect, e.g. "" or "/en". */
  localePrefix?: string;
};

/**
 * Listens for BookingGood embed postMessage success signals and fires the
 * same Google Ads conversion used on /booking/success.
 *
 * Today BookingGood's public embed does not reliably post a documented
 * success message (and gtagExternalOnly leaves firing to the parent). This
 * bridge is the parent-side receiver for when that message exists, and also
 * handles direct calls if the embed invokes parent.gtag_report_booking_complete.
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

    const markAndFire = (bookingId: string) => {
      const id = bookingId.trim();
      if (!isUsableBookingId(id) || fired.has(id)) {
        return false;
      }

      const dedupeKey = `booking_conversion_fired:${id}`;
      if (
        window.sessionStorage.getItem(dedupeKey) ||
        window.localStorage.getItem(dedupeKey)
      ) {
        fired.add(id);
        return false;
      }

      if (typeof window.gtag_report_booking_complete !== "function") {
        return false;
      }

      const sent = window.gtag_report_booking_complete(id);
      if (!sent) {
        return false;
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
      if (!isBookingGoodOrigin(event.origin)) {
        return;
      }

      const bookingId = extractBookingIdFromMessage(event.data);
      if (!bookingId) {
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
