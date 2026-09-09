/**
 * Canonical NAP (Name / Address / Phone) and related business facts.
 * Single source of truth for schema, citations, and UI.
 */

export const BUSINESS = {
  name: "Double Yellow Squash Club",
  legalName: "Sport And Beyond EOOD",
  eik: "208134448",
  url: "https://www.doubleyellowsquash.com",
  logo: "https://www.doubleyellowsquash.com/logo.png",
  image: "https://www.doubleyellowsquash.com/og/double-yellow-social-1200x630.png",
  email: "jakub@doubleyellowsquash.com",
  telephoneDisplay: "+359 896 754 014",
  telephoneE164: "+359896754014",
  telephoneTelHref: "tel:+359896754014",
  whatsappNumber: "359896754014",
  priceRange: "€€",
  venue: {
    streetAddress: "ul. Akademik Stefan Mladenov 21",
    streetAddressBg: 'ул. "Акад. Стефан Младенов" 21',
    addressLocality: "Sofia",
    addressLocalityBg: "София",
    postalCode: "1700",
    addressCountry: "BG",
    addressRegion: "Sofia-City",
    landmark: "National Sports Academy (NSA)",
    landmarkBg: "Национална спортна академия (НСА)",
  },
  legal: {
    streetAddress: "ul. Lyuben Rusev 6, apt. 6",
    addressLocality: "Sofia",
    postalCode: "1113",
    addressCountry: "BG",
  },
  /** Matches contact / home UI: open every day 07:00–22:00 */
  openingHours: {
    opens: "07:00",
    closes: "22:00",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ] as const,
  },
  mapUrl: "https://maps.app.goo.gl/UDAAByWq8sRQgraM9",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61576296615086",
    "https://www.instagram.com/doubleyellowsquashclub/",
    "https://www.tiktok.com/@doubleyellowsquash",
  ],
} as const;

export function getVenueAddressLine(locale: "bg" | "en" = "en") {
  if (locale === "bg") {
    return `${BUSINESS.venue.landmarkBg}, ${BUSINESS.venue.streetAddressBg}, ${BUSINESS.venue.postalCode} ${BUSINESS.venue.addressLocalityBg}`;
  }
  return `${BUSINESS.venue.landmark}, ${BUSINESS.venue.streetAddress}, ${BUSINESS.venue.postalCode} ${BUSINESS.venue.addressLocality}`;
}

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["SportsActivityLocation", "LocalBusiness"],
    "@id": `${BUSINESS.url}/#sportsclub`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: BUSINESS.url,
    image: [BUSINESS.logo, BUSINESS.image],
    logo: BUSINESS.logo,
    telephone: BUSINESS.telephoneDisplay,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.venue.streetAddress,
      addressLocality: BUSINESS.venue.addressLocality,
      postalCode: BUSINESS.venue.postalCode,
      addressCountry: BUSINESS.venue.addressCountry,
      addressRegion: BUSINESS.venue.addressRegion,
    },
    hasMap: BUSINESS.mapUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...BUSINESS.openingHours.days],
        opens: BUSINESS.openingHours.opens,
        closes: BUSINESS.openingHours.closes,
      },
    ],
    sameAs: [...BUSINESS.sameAs],
  };
}

export function getWebsiteJsonLd(locale: "bg" | "en" = "bg") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS.name,
    url: locale === "en" ? `${BUSINESS.url}/en` : BUSINESS.url,
    description:
      locale === "en"
        ? "New courts. New energy. Same obsession with squash. Double Yellow Squash Club, Sofia."
        : "Нови кортове. Нова енергия. Същата страст към скуоша. Double Yellow Squash Club, София.",
    inLanguage: locale === "en" ? "en" : "bg",
    publisher: {
      "@id": `${BUSINESS.url}/#sportsclub`,
    },
  };
}
