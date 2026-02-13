"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
  priority?: boolean;
};

let manifestCache: Record<string, string[]> | null = null;

async function loadManifest() {
  if (manifestCache) return manifestCache;
  try {
    const res = await fetch('/optimized/manifest.json');
    if (!res.ok) return null;
    const raw = await res.json();
    // normalize keys to forward slashes
    const normalized: Record<string, string[]> = {};
    for (const k of Object.keys(raw)) {
      const nk = k.replaceAll('\\\\', '/').replaceAll('\\', '/');
      normalized[nk.startsWith('/') ? nk : `/${nk}`] = raw[k];
    }
    manifestCache = normalized;
    return manifestCache;
  } catch (e) {
    return null;
  }
}

export default function OptimizedImage({ src, alt, width, height, className, style, loading = 'lazy', priority = false }: Props) {
  const [variants, setVariants] = useState<string[] | null>(null);
  const nextImageLoading = priority ? undefined : loading;

  useEffect(() => {
    let mounted = true;
    loadManifest().then((m) => {
      if (!mounted || !m) return;
      const key = src.startsWith('/') ? src : `/${src}`;
      const v = m[key] || null;
      if (v) setVariants(v.map((u) => u.replaceAll('\\\\', '/')));
    });
    return () => { mounted = false; };
  }, [src]);

  if (!variants || variants.length === 0) {
    return (
      <Image src={src} alt={alt} width={width || 800} height={height || 600} className={className} style={style} loading={nextImageLoading} priority={priority} />
    );
  }

  // separate webp and other variants
  const webp = variants.filter((u) => u.endsWith('.webp'));
  const others = variants.filter((u) => !u.endsWith('.webp'));

  // build srcset entries by parsing width from filename (e.g. name-1200.webp)
  const makeSrcSet = (arr: string[]) =>
    arr
      .map((u) => {
        const m = u.match(/-(\d+)\.(webp|jpe?g|png)$/);
        if (m) return `${u} ${m[1]}w`;
        return `${u}`;
      })
      .join(', ');

  const fallback = others.length ? others[others.length - 1] : webp[webp.length - 1] || src;

  return (
    <picture>
      {webp.length > 0 && (
        <source type="image/webp" srcSet={makeSrcSet(webp)} />
      )}
      {others.length > 0 && <source srcSet={makeSrcSet(others)} />}
      <img src={fallback} alt={alt} width={width} height={height} className={className} style={style} loading={loading} />
    </picture>
  );
}
