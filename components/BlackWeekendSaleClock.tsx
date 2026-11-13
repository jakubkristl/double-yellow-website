"use client";

import { useEffect } from "react";
import { BLACK_WEEKEND_CAROUSEL_ENDS_AT_MS } from "@/lib/heroSlideSchedule";

const MAX_TIMEOUT_MS = 2_147_483_647;

/**
 * Drops sale prices and stickers at the same instant the homepage carousel
 * removes the Black Weekend slide, including on a tab left open past 08:00.
 */
export default function BlackWeekendSaleClock() {
  useEffect(() => {
    let timeoutId = 0;

    const apply = () => {
      window.clearTimeout(timeoutId);
      const remaining = BLACK_WEEKEND_CAROUSEL_ENDS_AT_MS - Date.now();
      if (remaining <= 0) {
        document.documentElement.setAttribute("data-black-weekend-ended", "");
        return;
      }
      timeoutId = window.setTimeout(apply, Math.min(remaining, MAX_TIMEOUT_MS));
    };

    apply();
    return () => window.clearTimeout(timeoutId);
  }, []);

  return null;
}
