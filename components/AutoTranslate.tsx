"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (
          options: Record<string, unknown>,
          elementId: string
        ) => unknown;
      };
    };
  }
}

export default function AutoTranslate() {
  const pathname = usePathname();
  const isEnglishRoute = pathname === "/en" || pathname?.startsWith("/en/");

  useEffect(() => {
    if (isEnglishRoute) {
      document.cookie = "googtrans=/auto/en; path=/";
      return;
    }

    document.cookie = "googtrans=/auto/bg; path=/";

    const normalizeBrandName = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const variants = [
        /\bДвойно\s+жълто\b/gi,
        /\bДвоен\s+жълт\b/gi,
        /\bDouble\s+Yellow\s+Squash\s+Клуб\b/gi,
      ];

      let node = walker.nextNode();
      while (node) {
        const current = node as Text;
        let value = current.nodeValue ?? "";
        variants.forEach((pattern) => {
          value = value.replace(pattern, "Double Yellow");
        });
        if (value !== current.nodeValue) {
          current.nodeValue = value;
        }
        node = walker.nextNode();
      }
    };

    const applyBulgarian = () => {
      const combo = document.querySelector("select.goog-te-combo") as HTMLSelectElement | null;
      if (!combo) {
        normalizeBrandName();
        return;
      }

      if (combo.value !== "bg") {
        combo.value = "bg";
        combo.dispatchEvent(new Event("change"));
      }

      normalizeBrandName();
    };

    const intervalId = window.setInterval(applyBulgarian, 400);
    const timeoutId = window.setTimeout(() => window.clearInterval(intervalId), 12000);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [isEnglishRoute]);

  if (isEnglishRoute) {
    return null;
  }

  return (
    <>
      <div id="google_translate_element" className="sr-only" aria-hidden="true" />
      <Script
        id="google-translate-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.googleTranslateElementInit = function () {
              if (!window.google || !window.google.translate || !window.google.translate.TranslateElement) {
                return;
              }

              new window.google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  includedLanguages: 'bg',
                  autoDisplay: false
                },
                'google_translate_element'
              );
            };
          `,
        }}
      />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
