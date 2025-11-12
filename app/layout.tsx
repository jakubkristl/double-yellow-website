import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

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
        url: "https://doubleyellow.bg/hero/01.jpg",
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
    images: ["/hero/01.jpg"],
  },
};

import { EVENTS } from "@/lib/events";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Double Yellow Squash Club",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What equipment do I need to play squash?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For beginners we provide rackets and balls; regular players should bring non-marking indoor court shoes and a racket. Protective eyewear is recommended.",
      },
    },
    {
      "@type": "Question",
      name: "Do you accept MultiSport/CoolFit cards?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — we accept MultiSport and CoolFit cards, and card payments on site.",
      },
    },
  ],
};

const eventsSchema = EVENTS.map((e: any) => ({
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
  // Add non-critical but helpful properties for Google: performer, organizer, eventStatus and offers
  performer: e.performer || { "@type": "Organization", name: "Double Yellow Squash Club" },
  organizer: e.organizer || { "@type": "Organization", name: "Double Yellow Squash Club", url: "https://doubleyellow.bg" },
  eventStatus: e.eventStatus || "https://schema.org/EventScheduled",
  offers: e.offers || {
    "@type": "Offer",
    url: e.url,
    availability: "https://schema.org/InStock",
    priceCurrency: e.priceCurrency || "BGN",
  },
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* SEO JSON-LD injections */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }}
        />

        {/* Breadcrumb schema */}
        <Breadcrumbs />

        <Navbar />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
