"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
  alts?: string[];
  links?: Array<string | undefined>;
  linkLabels?: Array<string | undefined>;
  overlays?: Array<
    | {
        eyebrow?: string;
        title: string;
        body?: string;
        ctaLabel?: string;
      }
    | undefined
  >;
  intervalMs?: number;
};

export default function Carousel({
  images,
  alts = [],
  links = [],
  linkLabels = [],
  overlays = [],
  intervalMs = 4500,
}: Props) {
  const [i, setI] = useState(0);
  const [displayImages, setDisplayImages] = useState<string[]>(images);
  const [displayAlts, setDisplayAlts] = useState<string[]>(alts);
  const firstTrainingSlideIndex = displayAlts.findIndex((alt) =>
    alt.toLowerCase().includes("first training free")
  );

  // Sync displayImages when props.images changes
  useEffect(() => {
    setDisplayImages(images);
    setDisplayAlts(alts);
  }, [images, alts]);

  // slide rotation uses the client-side `displayImages` length
  useEffect(() => {
    if (displayImages.length === 0) return;
    const id = setInterval(() => {
      setI((p) => (p + 1) % displayImages.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [displayImages.length, intervalMs]);

  const prev = () => setI((p) => (p - 1 + Math.max(1, displayImages.length)) % Math.max(1, displayImages.length));
  const next = () => setI((p) => (p + 1) % Math.max(1, displayImages.length));

  return (
    <div className="carousel">
      {displayImages.map((src, idx) => {
        const isPosterSlide = idx === 0 && Boolean(links[idx]);
        const overlay = overlays[idx];
        const imageStyle = {
          objectFit: isPosterSlide ? ("contain" as const) : ("cover" as const),
          objectPosition: "center",
        };

        return (
          <div
            key={src}
            className={`slide ${idx === i ? "active" : ""}`}
          >
            {links[idx] ? (
              <a
                href={links[idx]}
                target="_blank"
                rel="noopener noreferrer"
                className="slide-link"
                aria-label={linkLabels[idx] || "Open linked slide"}
              >
                <Image
                  src={src}
                  alt={displayAlts[idx] || alts[idx] || "Club photo"}
                  fill
                  style={imageStyle}
                  priority={idx === 0}
                  sizes="100vw"
                />
              </a>
            ) : (
              <Image
                src={src}
                alt={displayAlts[idx] || alts[idx] || "Club photo"}
                fill
                style={imageStyle}
                priority={idx === 0}
                sizes="100vw"
              />
            )}
            {idx === firstTrainingSlideIndex && (
              <div className="carousel-overlay">
                <p className="carousel-overlay__en">First training free</p>
                <p className="carousel-overlay__bg">Първата тренировка е безплатна</p>
              </div>
            )}
            {overlay && (
              <div className="carousel-promo">
                {overlay.eyebrow && <p className="carousel-promo__eyebrow">{overlay.eyebrow}</p>}
                <p className="carousel-promo__title">{overlay.title}</p>
                {overlay.body && <p className="carousel-promo__body">{overlay.body}</p>}
                {links[idx] && overlay.ctaLabel && (
                  <a
                    href={links[idx]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="carousel-promo__cta"
                    aria-label={linkLabels[idx] || overlay.ctaLabel}
                  >
                    {overlay.ctaLabel}
                  </a>
                )}
              </div>
            )}
          </div>
        );
      })}

      <button className="nav prev" aria-label="Previous photo" onClick={prev}>
        ‹
      </button>
      <button className="nav next" aria-label="Next photo" onClick={next}>
        ›
      </button>
    </div>
  );
}
