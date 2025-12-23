"use client";

import Image from "next/image";
import OptimizedImage from "@/components/OptimizedImage";
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
          style={{ position: "relative" }}
        >
          <OptimizedImage
            src={src}
            alt={alts[idx] || "Club photo"}
            width={1600}
            height={900}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
