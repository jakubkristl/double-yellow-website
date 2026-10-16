"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  applyCookieConsent,
  COOKIE_CONSENT_STORAGE_KEY,
  readStoredCookieConsent,
  type CookieConsentPreferences,
} from "@/lib/tracking";
import "./CookieConsent.css";

const DENIED: CookieConsentPreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

const ACCEPTED: CookieConsentPreferences = {
  essential: true,
  analytics: true,
  marketing: true,
};

export default function CookieConsent() {
  const pathname = usePathname();
  const english = pathname?.startsWith("/en") ?? false;
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const saved = readStoredCookieConsent();
    if (!saved) {
      applyCookieConsent(DENIED);
      setShowBanner(true);
      return;
    }
    applyCookieConsent(saved);
  }, []);

  useEffect(() => {
    if (!showBanner) {
      document.documentElement.style.removeProperty("--cookie-bar-h");
      return;
    }

    const bar = document.querySelector(".cookie-bar");
    if (!bar) {
      return;
    }

    const applyHeight = () => {
      document.documentElement.style.setProperty(
        "--cookie-bar-h",
        `${bar.getBoundingClientRect().height}px`,
      );
    };

    applyHeight();
    const observer = new ResizeObserver(applyHeight);
    observer.observe(bar);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--cookie-bar-h");
    };
  }, [showBanner]);

  const save = (prefs: CookieConsentPreferences) => {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(prefs));
    applyCookieConsent(prefs);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-bar" role="region" aria-label="Cookies">
      <p className="cookie-bar-copy">
        <span>
          <strong>BG:</strong> Бисквитки за статистика и реклами. До избор Google
          етикетите са изключени.
        </span>{" "}
        <span>
          <strong>EN:</strong> Cookies for analytics and ads. Google tags stay off
          until you choose.
        </span>{" "}
        {english ? (
          <Link href="/en/cookies">Политика / Policy</Link>
        ) : (
          <Link href="/cookies">Политика / Policy</Link>
        )}
      </p>
      <div className="cookie-bar-actions">
        <button
          type="button"
          className="cookie-bar-btn cookie-bar-reject"
          onClick={() => save(DENIED)}
        >
          Отхвърлям / Reject
        </button>
        <button
          type="button"
          className="cookie-bar-btn cookie-bar-accept"
          onClick={() => save(ACCEPTED)}
        >
          Приемам / Accept
        </button>
      </div>
    </div>
  );
}
