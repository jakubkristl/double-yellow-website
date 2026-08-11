import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CookieConsent from "@/components/CookieConsent";
import FloatingContactActions from "@/components/FloatingContactActions";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Double Yellow Squash Club - София",
  description:
    "Нови кортове. Нова енергия. Същата страст към скуоша. Double Yellow Squash Club, София.",
  metadataBase: new URL("https://www.doubleyellowsquash.com"),
  keywords: [
    "squash club",
    "squash Sofia",
    "WSF courts",
    "squash coaching",
    "squash lessons",
    "squash events",
    "sports club Sofia",
  ],
  category: "Sports",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  authors: [{ name: "Double Yellow Squash Club", url: "https://www.doubleyellowsquash.com" }],
  openGraph: {
    title: "Double Yellow Squash Club - София",
    description:
      "Нови кортове. Нова енергия. Същата страст към скуоша. Double Yellow Squash Club, София.",
    url: "https://www.doubleyellowsquash.com",
    siteName: "Double Yellow Squash Club",
    locale: "bg_BG",
    images: [
      {
        url: "https://www.doubleyellowsquash.com/og/double-yellow-social-1200x630.png",
        alt: "Double Yellow Squash Club social card",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Double Yellow Squash Club - София",
    description:
      "Нови кортове. Нова енергия. Същата страст към скуоша. Double Yellow Squash Club, София.",
    images: ["/og/double-yellow-social-1200x630.png"],
  },
};

import { EVENTS } from "@/lib/events";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "@id": "https://www.doubleyellowsquash.com/#sportsclub",
  name: "Double Yellow Squash Club",
  legalName: "Sport And Beyond EOOD",
  url: "https://www.doubleyellowsquash.com",
  image: "https://www.doubleyellowsquash.com/logo.png",
  telephone: "+359 896 754 014",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ul. Akademik Stefan Mladenov 21",
    addressLocality: "Sofia",
    postalCode: "1700",
    addressCountry: "BG",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "09:00",
      closes: "21:00",
    },
  ],
  sameAs: [
    "https://facebook.com/doubleyellowsquash",
    "https://instagram.com/doubleyellowsquash",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Double Yellow Squash Club",
  url: "https://www.doubleyellowsquash.com",
  description:
    "Нови кортове. Нова енергия. Същата страст към скуоша. Double Yellow Squash Club, София.",
  inLanguage: "bg",
  publisher: {
    "@id": "https://www.doubleyellowsquash.com/#sportsclub",
  },
};

const eventsSchema = EVENTS.map((e) => ({
  "@type": "Event",
  "@context": "https://schema.org",
  name: e.title,
  startDate: e.startDate,
  endDate: e.endDate,
  url: e.url,
  description: e.description,
  image: e.image,
  location: {
    "@type": "Place",
    name: e.location.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: e.location.streetAddress,
      addressLocality: e.location.addressLocality,
      postalCode: e.location.postalCode,
      addressCountry: e.location.addressCountry,
    },
  },
  performer: e.performer,
  organizer: e.organizer,
  eventStatus: e.eventStatus,
  offers: e.offers,
}));

const conversionDebugEnabled =
  process.env.NODE_ENV !== "production" ||
  process.env.NEXT_PUBLIC_DEBUG_CONVERSIONS === "1";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const activeLang = cookieStore.get("site_lang")?.value === "en" ? "en" : "bg";

  return (
    <html lang={activeLang}>
      <body>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BQWPYFTG6V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BQWPYFTG6V');
          `}
        </Script>

        {/* Google Ads Conversion Tracking for Completed Bookings */}
        <Script id="google-ads-conversion" strategy="afterInteractive">
          {`
            var debugEnabled = ${conversionDebugEnabled ? "true" : "false"};

            window.gtag_report_booking_complete = function (bookingId) {
              var payload = {
                'send_to': 'AW-17840430561/Vnw5CK6LvOAbEOG7_bpC',
                'value': 1.0,
                'currency': 'EUR'
              };

              if (bookingId) {
                payload.transaction_id = String(bookingId);
              }

              if (debugEnabled && typeof console !== 'undefined' && console.info) {
                console.info('[tracking] booking conversion payload', payload);
              }

              gtag('event', 'conversion', payload);
              return true;
            };
          `}
        </Script>

        <a
          href="#main-content"
          style={{
            position: "absolute",
            left: -9999,
            top: "auto",
            width: 1,
            height: 1,
            overflow: "hidden",
          }}
          className="skip-link"
        >
          {activeLang === "en" ? "Skip to content" : "Към съдържанието"}
        </a>
        {/* SEO JSON-LD injections */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }}
        />

        {/* Breadcrumb schema */}
        <Breadcrumbs />

        <Navbar />
        <main id="main-content" className="container">{children}</main>
        <Footer />
        <FloatingContactActions />
        <CookieConsent />
      </body>
    </html>
  );
}
