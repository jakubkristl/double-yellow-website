import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CookieConsent from "@/components/CookieConsent";
import FloatingContactActions from "@/components/FloatingContactActions";
import GoogleTracking, {
  GoogleTagManagerNoscript,
} from "@/components/GoogleTracking";
import { cookies } from "next/headers";
import { getLocalBusinessJsonLd, getWebsiteJsonLd } from "@/lib/business";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Double Yellow Squash Club - София",
  description:
    "Нови кортове. Нова енергия. Същата страст към скуоша. Double Yellow Squash Club, София.",
  metadataBase: new URL(SITE_URL),
  keywords: [
    "скуош София",
    "скуош клуб",
    "squash Sofia",
    "squash club Sofia",
    "WSF courts",
    "уроци по скуош",
    "резервация скуош корт",
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
  authors: [{ name: "Double Yellow Squash Club", url: SITE_URL }],
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

const localBusinessSchema = getLocalBusinessJsonLd();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const activeLang = cookieStore.get("site_lang")?.value === "en" ? "en" : "bg";
  const websiteSchema = getWebsiteJsonLd(activeLang);

  return (
    <html lang={activeLang}>
      <head>
        <GoogleTracking />
      </head>
      <body>
        <GoogleTagManagerNoscript />

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
