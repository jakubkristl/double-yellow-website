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
  const [displayImages, setDisplayImages] = useState<string[]>(images);
  const [displayAlts, setDisplayAlts] = useState<string[]>(alts);

  // slide rotation uses the client-side `displayImages` length
  useEffect(() => {
    const id = setInterval(() => {
      setI((p) => (p + 1) % Math.max(1, displayImages.length));
    }, intervalMs);
    return () => clearInterval(id);
  }, [displayImages.length, intervalMs]);

  const prev = () => setI((p) => (p - 1 + Math.max(1, displayImages.length)) % Math.max(1, displayImages.length));
  const next = () => setI((p) => (p + 1) % Math.max(1, displayImages.length));


  // Holiday logic removed (expired Jan 2, 2026)

  return (
    <div className="carousel">
      {displayImages.map((src, idx) => (
        <div
          key={src}
          className={`slide ${idx === i ? "active" : ""}`}
          aria-hidden={idx !== i}
          style={{ position: "relative" }}
        >
          <OptimizedImage
            src={src}
            alt={displayAlts[idx] || alts[idx] || "Club photo"}
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
