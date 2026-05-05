import type { Metadata } from "next";

export const SITE_URL = "https://doubleyellow.bg";
export const SITE_NAME = "Double Yellow Squash Club";
export const DEFAULT_OG_IMAGE = "/hero/01b.jpeg";

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
  path: `/${string}` | "/";
  title: string;
  description: string;
  image?: string;
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

export function getCanonicalUrl(path: `/${string}` | "/") {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export function createPageMetadata({
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
}: CreatePageMetadataInput): Metadata {
  const canonicalUrl = getCanonicalUrl(path);
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_BG",
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
