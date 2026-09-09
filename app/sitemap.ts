import type { MetadataRoute } from "next";
import { articles as bgArticles } from "@/lib/articles";
import { articles as enArticles } from "@/lib/articles-en";
import { getCanonicalUrl, getEnPath, siteRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of siteRoutes) {
    const languageAlternates = {
      "bg-BG": getCanonicalUrl(route.path),
      en: getCanonicalUrl(getEnPath(route.path)),
      "x-default": getCanonicalUrl(route.path),
    };

    entries.push({
      url: getCanonicalUrl(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: languageAlternates,
      },
    });

    entries.push({
      url: getCanonicalUrl(getEnPath(route.path)),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: Math.max(0.1, route.priority - 0.05),
      alternates: {
        languages: languageAlternates,
      },
    });
  }

  const enBySlug = new Map(enArticles.map((article) => [article.slug, article]));

  for (const article of bgArticles) {
    const path = `/learn/${article.slug}` as `/${string}`;
    const enArticle = enBySlug.get(article.slug);
    const lastModified = new Date(
      Math.max(
        new Date(article.date).getTime(),
        enArticle ? new Date(enArticle.date).getTime() : 0
      )
    );
    const languageAlternates = {
      "bg-BG": getCanonicalUrl(path),
      en: getCanonicalUrl(getEnPath(path)),
      "x-default": getCanonicalUrl(path),
    };

    entries.push({
      url: getCanonicalUrl(path),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: languageAlternates,
      },
    });

    if (enArticle) {
      entries.push({
        url: getCanonicalUrl(getEnPath(path)),
        lastModified,
        changeFrequency: "monthly",
        priority: 0.65,
        alternates: {
          languages: languageAlternates,
        },
      });
    }
  }

  return entries;
}
