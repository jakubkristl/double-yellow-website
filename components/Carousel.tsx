"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Overlay = {
  eyebrow?: string;
  title: string;
  body?: string;
  ctaLabel?: string;
};

type Props = {
  images: string[];
  alts?: string[];
  links?: Array<string | undefined>;
  linkLabels?: Array<string | undefined>;
  overlays?: Array<Overlay | undefined>;
  /** UTC milliseconds when that slide must disappear. Gone at that instant. */
  hideAtMs?: Array<number | undefined>;
  intervalMs?: number;
};

const MAX_TIMEOUT_MS = 2_147_483_647;

export default function Carousel({
  images,
  alts = [],
  links = [],
  linkLabels = [],
  overlays = [],
  hideAtMs = [],
  intervalMs = 4500,
}: Props) {
  const [visible, setVisible] = useState<number[]>(() => images.map((_, index) => index));
  const [i, setI] = useState(0);
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  useEffect(() => {
    let timeoutId = 0;

    const apply = () => {
      window.clearTimeout(timeoutId);
      const now = Date.now();
      const nextVisible: number[] = [];
      let nextDeadline: number | undefined;

      for (let index = 0; index < images.length; index += 1) {
        const deadline = hideAtMs[index];
        if (typeof deadline === "number" && now >= deadline) {
          if (images[index]?.includes("black-weekend")) {
            document.documentElement.setAttribute("data-black-weekend-ended", "");
          }
          continue;
        }
        nextVisible.push(index);
        if (typeof deadline === "number" && (nextDeadline === undefined || deadline < nextDeadline)) {
          nextDeadline = deadline;
        }
      }

      const previousVisible = visibleRef.current;
      const unchanged =
        nextVisible.length === previousVisible.length &&
        nextVisible.every((value, index) => value === previousVisible[index]);

      if (!unchanged) {
        setI((prev) => {
          const sourceIndex = previousVisible[prev];
          const nextPos = nextVisible.indexOf(sourceIndex);
          if (nextPos !== -1) return nextPos;
          return Math.min(prev, Math.max(0, nextVisible.length - 1));
        });
        visibleRef.current = nextVisible;
        setVisible(nextVisible);
      }

      if (nextDeadline !== undefined) {
        const delay = Math.min(Math.max(0, nextDeadline - Date.now()), MAX_TIMEOUT_MS);
        timeoutId = window.setTimeout(apply, delay);
      }
    };

    apply();
    document.addEventListener("visibilitychange", apply);
    return () => {
      window.clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", apply);
    };
  }, [images, hideAtMs]);

  const len = visible.length;

  useEffect(() => {
    if (len === 0) return;
    const id = setInterval(() => {
      setI((p) => (p + 1) % len);
    }, intervalMs);
    return () => clearInterval(id);
  }, [len, intervalMs]);

  const count = Math.max(1, len);
  const prev = () => setI((p) => (p - 1 + count) % count);
  const next = () => setI((p) => (p + 1) % count);

  const displayIndexes =
    len === 0
      ? []
      : len === 1
        ? [0]
        : Array.from(new Set([(i - 1 + len) % len, i % len, (i + 1) % len]));

  const firstTrainingSlideIndex = visible.findIndex((sourceIndex) =>
    (alts[sourceIndex] || "").toLowerCase().includes("first training free"),
  );

  return (
    <div className="carousel">
      {displayIndexes.map((idx) => {
        const sourceIndex = visible[idx];
        const src = images[sourceIndex];
        // Announcement posters (/events/…) and linked first slides use contain so text is not cropped.
        const isPosterSlide =
          idx === 0 &&
          (Boolean(links[sourceIndex]) || src.startsWith("/events/"));
        const overlay = overlays[sourceIndex];
        const imageStyle = {
          objectFit: isPosterSlide ? ("contain" as const) : ("cover" as const),
          objectPosition: "center",
        };
        const slideId = src.includes("black-weekend") ? "black-weekend" : undefined;

        return (
          <div
            key={src}
            className={`slide ${idx === i % count ? "active" : ""}`}
            data-carousel-slide={slideId}
          >
            {links[sourceIndex] ? (
              <a
                href={links[sourceIndex]}
                target="_blank"
                rel="noopener noreferrer"
                className="slide-link"
                aria-label={linkLabels[sourceIndex] || "Open linked slide"}
              >
                <Image
                  src={src}
                  alt={alts[sourceIndex] || "Club photo"}
                  fill
                  style={imageStyle}
                  priority={idx === i % count}
                  sizes="100vw"
                />
              </a>
            ) : (
              <Image
                src={src}
                alt={alts[sourceIndex] || "Club photo"}
                fill
                style={imageStyle}
                priority={idx === i % count}
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
                {links[sourceIndex] && overlay.ctaLabel && (
                  <a
                    href={links[sourceIndex]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="carousel-promo__cta"
                    aria-label={linkLabels[sourceIndex] || overlay.ctaLabel}
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
