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

    const fallbackId = `${window.location.pathname}${window.location.search}`;
    const id = bookingId && bookingId.trim().length > 0 ? bookingId : fallbackId;
    const dedupeKey = `booking_conversion_fired:${id}`;

    if (window.sessionStorage.getItem(dedupeKey)) {
      return;
    }

    if (typeof window.gtag_report_booking_complete === "function") {
      window.gtag_report_booking_complete(id);
      window.sessionStorage.setItem(dedupeKey, "1");
    }
  }, [bookingId]);

  return null;
}
