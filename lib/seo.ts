import type { Metadata } from "next";
import { BUSINESS } from "@/lib/business";

export const SITE_URL = BUSINESS.url;
export const SITE_NAME = BUSINESS.name;
export const DEFAULT_OG_IMAGE = "/og/double-yellow-social-1200x630.png";

export type SiteLocale = "bg" | "en";

type RouteDefinition = {
  path: `/${string}` | "/";
  priority: number;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
};

type CreatePageMetadataInput = {
  /** Unprefixed route path, e.g. "/" or "/contact" */
  path: `/${string}` | "/";
  title: string;
  description: string;
  image?: string;
  locale?: SiteLocale;
};

export const siteRoutes: RouteDefinition[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/activities", priority: 0.9, changeFrequency: "weekly" },
  { path: "/beginner-squash-sofia", priority: 0.9, changeFrequency: "weekly" },
  { path: "/booking", priority: 0.9, changeFrequency: "daily" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
  { path: "/events", priority: 0.8, changeFrequency: "weekly" },
  { path: "/learn", priority: 0.9, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.7, changeFrequency: "monthly" },
  { path: "/membership", priority: 0.8, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/squash-lessons-sofia", priority: 0.9, changeFrequency: "weekly" },
  { path: "/squash-sofia", priority: 0.9, changeFrequency: "weekly" },
  { path: "/store", priority: 0.8, changeFrequency: "weekly" },
  { path: "/team", priority: 0.7, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export function getBgPath(path: `/${string}` | "/") {
  return path;
}

export function getEnPath(path: `/${string}` | "/") {
  return path === "/" ? "/en" : `/en${path}`;
}

export function getCanonicalUrl(path: string) {
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  locale = "bg",
}: CreatePageMetadataInput): Metadata {
  const bgPath = getBgPath(path);
  const enPath = getEnPath(path);
  const canonicalPath = locale === "en" ? enPath : bgPath;
  const canonicalUrl = getCanonicalUrl(canonicalPath);
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        "bg-BG": bgPath,
        en: enPath,
        "x-default": bgPath,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: locale === "en" ? "en_BG" : "bg_BG",
      type: "website",
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
