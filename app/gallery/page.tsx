"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const galleryCategories = [
  {
    title: "The Courts",
    description: "Our renovated squash courts with WSF specifications",
    images: [
      { src: "/hero/01.jpg", alt: "Main squash court - Double Yellow", rotation: 0 },
      { src: "/hero/02.jpg", alt: "Court view with lighting", rotation: 0 },
      { src: "/hero/03.jpg", alt: "Professional court setup", rotation: 0 },
      { src: "/hero/04.jpg", alt: "Court flooring and walls", rotation: 0 },
    ],
  },
      {
        title: "Transformation",
        description: "From renovation to revival — our journey",
        images: [
          { src: "/about/before1.jpg", alt: "Before renovation - worn walls", rotation: 0 },
          { src: "/about/before2.jpg", alt: "Before renovation - damage detail", rotation: 0 },
          { src: "/about/during1.jpg", alt: "Renovation in progress - front wall", rotation: 0 },
          { src: "/about/during2.jpg", alt: "Renovation in progress - new panels", rotation: 0 },
          { src: "/about/after1.jpg", alt: "Renovated squash courts - Double Yellow", rotation: 0 },
          { src: "/about/after2.jpg", alt: "Finished court with seating area", rotation: 0 },
        ],
      },
  {
    title: "Activities & Events",
    description: "Community sessions, tournaments, and coaching",
    images: [
      { src: "/activities/timeforladies.jpg", alt: "Time for Ladies session", rotation: 0 },
      { src: "/activities/minisquash.jpg", alt: "Mini Squash for kids", rotation: 0 },
      { src: "/activities/magnificent7.jpg", alt: "Magnificent 7 tournament", rotation: 0 },
      { src: "/activities/comeandplay.jpg", alt: "Come and Play session", rotation: 0 },
      { src: "/activities/beginners.jpg", alt: "Squash for Beginners class", rotation: 0 },
      { src: "/activities/glasschallenge.jpg", alt: "Glass Challenge event", rotation: 0 },
    ],
  },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<{ catIdx: number; imgIdx: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const initialPinchDistanceRef = useRef<number | null>(null);
  const initialZoomRef = useRef<number>(1);
  const lastPointerPosRef = useRef<{ x: number; y: number } | null>(null);
  const panRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selected) return;

    lastActiveRef.current = document.activeElement as HTMLElement | null;
    setZoom(1); // Reset zoom when opening a new image

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
      }
      if (e.key === "ArrowRight") {
        navigate(1);
      }
      if (e.key === "ArrowLeft") {
        navigate(-1);
      }
    };

    document.addEventListener("keydown", onKey);
    // focus the close button for screen reader / keyboard users
    setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      document.removeEventListener("keydown", onKey);
      // return focus to previous element
      lastActiveRef.current?.focus?.();
    };

    // helper to navigate images when modal is open
    const sel = selected;
    function navigate(delta: number) {
      if (!sel) return;
      const flat = galleryCategories.flatMap((c, ci) =>
        c.images.map((img, i) => ({ ci, i, src: img.src, alt: img.alt }))
      );
      const current = flat.findIndex((it) => it.ci === sel.catIdx && it.i === sel.imgIdx);
      if (current === -1) return;
      const next = flat[(current + delta + flat.length) % flat.length];
      setSelected({ catIdx: next.ci, imgIdx: next.i });
    }
  }, [selected]);

  useEffect(() => {
    if (zoom === 1) {
      panRef.current = { x: 0, y: 0 };
      setTranslate({ x: 0, y: 0 });
    }
    initialZoomRef.current = zoom;
  }, [zoom]);

  function getDistance(a: { x: number; y: number }, b: { x: number; y: number }) {
    return Math.hypot(b.x - a.x, b.y - a.y);
  }

  function clampTranslateForCurrent(translateIn: { x: number; y: number }, zoomIn: number) {
    const container = containerRef.current;
    if (!container) return translateIn;
    const img = container.querySelector('img') as HTMLImageElement | null;
    if (!img) return translateIn;
    const cRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    const displayedW = imgRect.width;
    const displayedH = imgRect.height;
    const overflowX = Math.max(0, displayedW * zoomIn - cRect.width);
    const overflowY = Math.max(0, displayedH * zoomIn - cRect.height);
    const maxX = overflowX / 2;
    const maxY = overflowY / 2;

    return {
      x: Math.max(-maxX, Math.min(maxX, translateIn.x)),
      y: Math.max(-maxY, Math.min(maxY, translateIn.y)),
    };
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    lastPointerPosRef.current = { x: e.clientX, y: e.clientY };
    if (pointersRef.current.size === 2) {
      const [p1, p2] = Array.from(pointersRef.current.values());
      initialPinchDistanceRef.current = getDistance(p1, p2);
      initialZoomRef.current = zoom;
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2) {
      const [p1, p2] = Array.from(pointersRef.current.values());
      const dist = getDistance(p1, p2);
      const initial = initialPinchDistanceRef.current;
      if (initial && initial > 0) {
        const scaleFactor = dist / initial;
        const nextZoom = Math.min(Math.max(initialZoomRef.current * scaleFactor, 1), 3);
        setZoom(nextZoom);
      }
    } else if (pointersRef.current.size === 1 && zoom > 1) {
      const last = lastPointerPosRef.current;
      if (!last) return;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      panRef.current = { x: panRef.current.x + dx, y: panRef.current.y + dy };
      const clamped = clampTranslateForCurrent(panRef.current, zoom);
      panRef.current = clamped;
      setTranslate({ ...panRef.current });
      lastPointerPosRef.current = { x: e.clientX, y: e.clientY };
      isDraggingRef.current = true;
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(e.pointerId);
    lastPointerPosRef.current = null;
    initialPinchDistanceRef.current = null;
    initialZoomRef.current = zoom;
    try {
      (e.currentTarget as Element).releasePointerCapture(e.pointerId);
    } catch (err) {}
    if (pointersRef.current.size === 0 && zoom <= 1) {
      panRef.current = { x: 0, y: 0 };
      setTranslate({ x: 0, y: 0 });
    }
  };

  const onDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const clickX = e.clientX - rect.left - rect.width / 2 - translate.x;
    const clickY = e.clientY - rect.top - rect.height / 2 - translate.y;

    const targetZoom = zoom === 1 ? 2 : 1;
    const factor = targetZoom / (zoom || 1);
    const next = {
      x: (translate.x - clickX) * factor + clickX,
      y: (translate.y - clickY) * factor + clickY,
    };
    initialZoomRef.current = targetZoom;
    setZoom(targetZoom);
    const clamped = clampTranslateForCurrent(next, targetZoom);
    panRef.current = clamped;
    setTranslate(clamped);
  };

  return (
    <main style={{ padding: "40px 20px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 className="page-title">Gallery</h1>
      <p style={{ color: "#ccc", fontSize: "20px", marginBottom: "60px", textAlign: "center" }}>
        A visual journey through Double Yellow — courts, community, and everything in between.
      </p>

      {galleryCategories.map((category, idx) => (
        <section key={category.title} style={{ marginBottom: "80px" }}>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ 
              color: "var(--accent)", 
              fontSize: "clamp(24px, 3vw, 32px)", 
              fontWeight: 700,
              marginBottom: "8px"
            }}>
              {category.title}
            </h2>
            <p style={{ color: "#999", fontSize: "16px" }}>
              {category.description}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {category.images.map((image, imgIdx) => (
              <button
                key={image.src + imgIdx}
                type="button"
                onClick={() => setSelected({ catIdx: idx, imgIdx })}
                style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  overflow: "hidden",
                  borderRadius: "12px",
                  cursor: "zoom-in",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  border: "none",
                  padding: 0,
                  background: "transparent",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(255, 204, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
                }}
                aria-label={`Open ${image.alt} in lightbox`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{ objectFit: "cover", transform: `rotate(${image.rotation}deg)` }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </section>
      ))}

      {/* Lightbox Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
            cursor: zoom > 1 ? "grab" : "pointer",
            overflow: "hidden",
          }}
          onWheel={(e) => {
            e.preventDefault();
            const rect = containerRef.current?.getBoundingClientRect();
            const delta = e.deltaY < 0 ? 0.2 : -0.2;
            const prev = zoom;
            const nextZoom = Math.min(Math.max(prev + delta, 1), 3);

            if (rect && prev !== nextZoom) {
              const clickX = e.clientX - rect.left - rect.width / 2 - translate.x;
              const clickY = e.clientY - rect.top - rect.height / 2 - translate.y;
              const factor = nextZoom / prev;
              const next = {
                x: (translate.x - clickX) * factor + clickX,
                y: (translate.y - clickY) * factor + clickY,
              };
              const clamped = clampTranslateForCurrent(next, nextZoom);
              panRef.current = clamped;
              setTranslate(clamped);
            }

            setZoom(nextZoom);
          }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (isDraggingRef.current) {
                // avoid click after panning
                isDraggingRef.current = false;
                return;
              }
              if (zoom === 1) {
                setZoom(2);
              } else {
                setZoom(1);
              }
            }}
            ref={containerRef}
            onDoubleClick={onDoubleClick}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              cursor: zoom > 1 ? "zoom-out" : "zoom-in",
              transition: "transform 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              touchAction: "none",
            }}
          >
            {
              (() => {
                const img = galleryCategories[selected.catIdx].images[selected.imgIdx];
                return (
                  <>
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={1200}
                      height={900}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "90vh",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        transform: `translate(${translate.x}px, ${translate.y}px) rotate(${img.rotation}deg) scale(${zoom})`,
                        transition: "transform 0.12s ease",
                        cursor: zoom > 1 ? "zoom-out" : "zoom-in",
                      }}
                    />
                    <button
                      ref={closeButtonRef}
                      onClick={() => setSelected(null)}
                      style={{
                        position: "absolute",
                        top: "-40px",
                        right: "0",
                        background: "none",
                        border: "none",
                        color: "#fff",
                        fontSize: "32px",
                        cursor: "pointer",
                        padding: "10px",
                        lineHeight: 1,
                      }}
                      aria-label="Close"
                    >
                      ✕
                    </button>
                    <p
                      style={{
                        color: "#ccc",
                        textAlign: "center",
                        marginTop: "16px",
                        fontSize: "14px",
                      }}
                    >
                      {img.alt}
                    </p>
                  </>
                );
              })()
            }
          </div>
        </div>
      )}
    </main>
  );
}
