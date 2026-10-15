import type { ImageLoaderProps } from "next/image";

const normalizeSrc = (src: string) => {
  return src.startsWith("/") ? src.slice(1) : src;
};

/**
 * Serve transforms via Cloudflare's /cdn-cgi/image path so resizing
 * never runs inside the OpenNext Worker (IMAGES binding → Error 1102).
 */
export default function cloudflareLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  if (process.env.NODE_ENV === "development") {
    return `${src}?${params.join("&")}`;
  }
  return `/cdn-cgi/image/${params.join(",")}/${normalizeSrc(src)}`;
}
