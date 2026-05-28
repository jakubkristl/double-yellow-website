"use client";

import { useEffect } from "react";

type Props = {
  bookingId?: string;
};

declare global {
  interface Window {
    gtag_report_booking_complete?: (bookingId?: string) => boolean;
  }
}

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

    if (typeof window.gtag_report_booking_complete === "function") {
      window.gtag_report_booking_complete(id);
      window.sessionStorage.setItem(dedupeKey, "1");
      window.localStorage.setItem(dedupeKey, "1");
    }
  }, [bookingId]);

  return null;
}
