import type { MetadataRoute } from "next";
import { articles as bgArticles } from "@/lib/articles";
import { articles as enArticles } from "@/lib/articles-en";
import { getCanonicalUrl, getEnPath, siteRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of siteRoutes) {
    entries.push({
      url: getCanonicalUrl(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          "bg-BG": getCanonicalUrl(route.path),
          en: getCanonicalUrl(getEnPath(route.path)),
        },
      },
    });

    entries.push({
      url: getCanonicalUrl(getEnPath(route.path)),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: Math.max(0.1, route.priority - 0.05),
      alternates: {
        languages: {
          "bg-BG": getCanonicalUrl(route.path),
          en: getCanonicalUrl(getEnPath(route.path)),
        },
      },
    });
  }

  for (const article of bgArticles) {
    const path = `/learn/${article.slug}`;
    entries.push({
      url: getCanonicalUrl(path),
      lastModified: new Date(article.date),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const article of enArticles) {
    const path = `/learn/${article.slug}`;
    entries.push({
      url: getCanonicalUrl(getEnPath(path as `/${string}`)),
      lastModified: new Date(article.date),
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  return entries;
}
