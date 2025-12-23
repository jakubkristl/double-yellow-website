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


  // On client mount, optionally prepend the holiday image so SSR stays consistent
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const holidayUrl = '/hero/santa-holiday.jpg';
        const end = new Date(2026, 0, 2); // Jan 2, 2026
        if (typeof window !== 'undefined' && new Date() < end) {
          if (!images.includes(holidayUrl)) {
            const res = await fetch(holidayUrl, { method: 'HEAD' });
            if (!mounted) return;
            if (res.ok) {
              setDisplayImages((prev) => [holidayUrl, ...prev]);
              setDisplayAlts((prev) => ["Holiday special - Santa celebrating with tennis at Double Yellow Squash Club", ...prev]);
              setI(0);
            }
          }
        }
      } catch (e) {
        // ignore network errors
      }
    })();
    return () => { mounted = false; };
  }, [images]);

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
