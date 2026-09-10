"use client";

import { useEffect } from "react";

type Props = {
  bookingId?: string;
};

export default function BookingSuccessTracker({ bookingId }: Props) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const id = bookingId?.trim();

    // Only fire for explicit booking confirmations carrying a booking id.
    if (!id) {
      return;
    }

    // Avoid polluting production metrics with common QA/test ids.
    if (/^(qa|test)[-_]/i.test(id)) {
      return;
    }

    const dedupeKey = `booking_conversion_fired:${id}`;

    if (
      window.sessionStorage.getItem(dedupeKey) ||
      window.localStorage.getItem(dedupeKey)
    ) {
      return;
    }

    let cancelled = false;
    let attempts = 0;

    const fire = () => {
      if (cancelled) {
        return;
      }

      if (typeof window.gtag_report_booking_complete !== "function") {
        if (attempts < 20) {
          attempts += 1;
          window.setTimeout(fire, 250);
        }
        return;
      }

      const sent = window.gtag_report_booking_complete(id);
      if (!sent) {
        return;
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "booking_complete",
        booking_id: id,
        transaction_id: id,
        value: 1.0,
        currency: "EUR",
      });

      window.sessionStorage.setItem(dedupeKey, "1");
      window.localStorage.setItem(dedupeKey, "1");
    };

    fire();

    return () => {
      cancelled = true;
    };
  }, [bookingId]);

  return null;
}
