import type { MetadataRoute } from "next";
import { articles as bgArticles } from "@/lib/articles";
import { articles as enArticles } from "@/lib/articles-en";
import { getCanonicalUrl, getEnPath, siteRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of siteRoutes) {
    const bgUrl = getCanonicalUrl(route.path);
    const enUrl = getCanonicalUrl(getEnPath(route.path));
    const languages = {
      "bg-BG": bgUrl,
      en: enUrl,
      "x-default": bgUrl,
    };

    entries.push({
      url: bgUrl,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages },
    });

    entries.push({
      url: enUrl,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: Number((route.priority - 0.05).toFixed(2)),
      alternates: { languages },
    });
  }

  const enSlugs = new Set(enArticles.map((article) => article.slug));
  const bgSlugs = new Set(bgArticles.map((article) => article.slug));

  for (const article of bgArticles) {
    const path = `/learn/${article.slug}`;
    const bgUrl = getCanonicalUrl(path);
    const languages: Record<string, string> = {
      "bg-BG": bgUrl,
      "x-default": bgUrl,
    };

    if (enSlugs.has(article.slug)) {
      languages.en = getCanonicalUrl(getEnPath(path as `/${string}`));
    }

    entries.push({
      url: bgUrl,
      lastModified: new Date(article.date),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    });
  }

  for (const article of enArticles) {
    const path = `/learn/${article.slug}` as `/${string}`;
    const enUrl = getCanonicalUrl(getEnPath(path));
    const languages: Record<string, string> = {
      en: enUrl,
    };

    if (bgSlugs.has(article.slug)) {
      const bgUrl = getCanonicalUrl(path);
      languages["bg-BG"] = bgUrl;
      languages["x-default"] = bgUrl;
    }

    entries.push({
      url: enUrl,
      lastModified: new Date(article.date),
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: { languages },
    });
  }

  return entries;
}
