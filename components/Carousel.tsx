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

  useEffect(() => {
    const id = setInterval(() => {
      setI((p) => (p + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  const prev = () => setI((p) => (p - 1 + images.length) % images.length);
  const next = () => setI((p) => (p + 1) % images.length);

  return (
    <div className="carousel">
      {images.map((src, idx) => (
        <div
          key={src}
          className={`slide ${idx === i ? "active" : ""}`}
          aria-hidden={idx !== i}
        >
          <Image
            src={src}
            alt={alts[idx] || "Club photo"}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority={idx === 0}
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
