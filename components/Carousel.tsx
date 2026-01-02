"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
  alts?: string[];
  intervalMs?: number;
};

export default function Carousel({ images, alts = [], intervalMs = 4500 }: Props) {
  const [i, setI] = useState(0);
  const [displayImages, setDisplayImages] = useState<string[]>(images);
  const [displayAlts, setDisplayAlts] = useState<string[]>(alts);

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
      {displayImages.map((src, idx) => (
        <div
          key={src}
          className={`slide ${idx === i ? "active" : ""}`}
          aria-hidden={idx !== i}
        >
          <Image
            src={src}
            alt={displayAlts[idx] || alts[idx] || "Club photo"}
            fill
            style={{ objectFit: "cover" }}
            priority={idx === 0}
            sizes="100vw"
          />
        </div>
      ))}

      <button className="nav prev" aria-label="Previous photo" onClick={prev}>
        ‹
      </button>
      <button className="nav next" aria-label="Next photo" onClick={next}>
        ›
      </button>
    </div>
  );
}
