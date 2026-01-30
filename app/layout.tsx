import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Double Yellow Squash Club — Sofia",
  description:
    "New courts. New energy. Same obsession with squash. Double Yellow Squash Club, Sofia.",
  metadataBase: new URL("https://doubleyellow.bg"),
  openGraph: {
    title: "Double Yellow Squash Club — Sofia",
    description:
      "New courts. New energy. Same obsession with squash. Double Yellow Squash Club, Sofia.",
    url: "https://doubleyellow.bg",
    siteName: "Double Yellow Squash Club",
    images: [
      {
        url: "https://doubleyellow.bg/hero/01.jpeg",
        alt: "Double Yellow Squash Club - renovated WSF courts",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Double Yellow Squash Club — Sofia",
    description:
      "New courts. New energy. Same obsession with squash. Double Yellow Squash Club, Sofia.",
    images: ["/hero/01.jpeg"],
  },
};

import { EVENTS } from "@/lib/events";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Double Yellow Squash Club",
  legalName: "Sport And Beyond EOOD",
  url: "https://doubleyellow.bg",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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

        {/* Google Ads Conversion Tracking for Click to Call */}
        <Script id="google-ads-conversion" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'AW-1784043056l/Vnw5CK6LvOAbEOG7_bpC',
                'value': 1.0,
                'currency': 'EUR',
                'event_callback': callback
              });
              return false;
            }
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
          Skip to content
        </a>
        {/* SEO JSON-LD injections */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
        <CookieConsent />
      </body>
    </html>
  );
}
