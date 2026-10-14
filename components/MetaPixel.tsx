"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  applyMetaPixelConsent,
  readStoredCookieConsent,
  trackMetaPageView,
} from "@/lib/tracking";

/**
 * Initializes Meta Pixel from saved marketing consent and fires PageView
 * on App Router client navigations. Does not load the pixel before consent.
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const saved = readStoredCookieConsent();
    if (saved) {
      applyMetaPixelConsent(saved);
    }
  }, []);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    if (previousPath.current === null) {
      previousPath.current = pathname;
      return;
    }

    if (previousPath.current === pathname) {
      return;
    }

    previousPath.current = pathname;

    const saved = readStoredCookieConsent();
    if (saved?.marketing) {
      trackMetaPageView();
    }
  }, [pathname]);

  return null;
}
