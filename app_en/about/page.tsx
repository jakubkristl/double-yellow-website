// app/about/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function AboutPage() {
  const [zoomedImg, setZoomedImg] = useState<{ src: string; alt: string } | null>(null);
  return (
    <section className="container about-section">
      <div className="membership-header">
        <h1 className="page-title">About Double Yellow</h1>
        <div className="membership-sub">
          Passion, renovation, and a bit of squash dust.
        </div>
      </div>

      <div className="about-content">
        <p>
          <strong>Double Yellow Squash Club</strong>, operated by{" "}
          <strong>Sport And Beyond EOOD</strong>, was born from a simple idea:
          to bring life back to the long-forgotten squash courts at the National
          Sports Academy in Sofia — and to build a modern, community-driven home
          for the game we love.
        </p>

        <p>
          The project started as a renovation mission and quickly became a
          full-blown revival. The courts had seen better days — cracked walls,
          dim lights, warped floors. But what they lacked in shine, they made up
          for in potential.
        </p>

        <p>
          Over the following months, we stripped, repaired, and rebuilt.{" "}
          <strong>Front-wall HPL panels</strong>, new <strong>LED lighting</strong>,
          resurfaced floors, redesigned reception — every detail mattered. From
          the tin logo to the court lines, the goal was clear:{" "}
          <em>bring energy, visibility, and pride back to Bulgarian squash.</em>
        </p>

        <p>
          Today, Double Yellow is more than a club. It’s a space for players,
          beginners, and fans alike — running weekly sessions, tournaments, and
          community events that keep the game alive and accessible.
        </p>

        <p className="about-signoff">
          <strong>— Jakub Kristl</strong>
          <br />
          Founder, Double Yellow Squash Club • Sport And Beyond EOOD
        </p>
      </div>

      {/* FROM DUST TO DOUBLE YELLOW */}
      <div className="about-gallery-intro">
        <h2 className="gallery-title">From Dust to Double Yellow</h2>
        <div className="gallery-underline"></div>
        <p className="gallery-sub">
          A look back at how it started, how it went, and how it shines today.
        </p>
      </div>

      {/* BEFORE / DURING / AFTER visual story */}
      <div className="about-gallery-grid">
        <div className="gallery-group">
          <h3 className="gallery-heading">Before</h3>
            <div className="gallery-row">
                <div style={{ position: "relative", width: "100%", flex: 1, minWidth: 200, cursor: "pointer" }} onClick={() => setZoomedImg({ src: "/about/before1.jpg", alt: "Before renovation - worn walls" })}>
                <Image src="/about/before1.jpg" alt="Before renovation - worn walls" width={800} height={600} style={{ objectFit: "cover", borderRadius: 8 }} />
              </div>
              <div style={{ position: "relative", width: "100%", flex: 1, minWidth: 200, cursor: "pointer" }} onClick={() => setZoomedImg({ src: "/about/before2.jpg", alt: "Before renovation - damage detail" })}>
                <Image src="/about/before2.jpg" alt="Before renovation - damage detail" width={800} height={600} style={{ objectFit: "cover", borderRadius: 8 }} />
              </div>
            </div>
        </div>

        <div className="gallery-group">
          <h3 className="gallery-heading">During</h3>
          <div className="gallery-row">
              <div style={{ position: "relative", width: "100%", flex: 1, minWidth: 200, cursor: "pointer" }} onClick={() => setZoomedImg({ src: "/about/during1.jpg", alt: "Renovation in progress - front wall" })}>
              <Image src="/about/during1.jpg" alt="Renovation in progress - front wall" width={800} height={600} style={{ objectFit: "cover", borderRadius: 8 }} />
            </div>
            <div style={{ position: "relative", width: "100%", flex: 1, minWidth: 200, cursor: "pointer" }} onClick={() => setZoomedImg({ src: "/about/during2.jpg", alt: "Renovation in progress - new panels" })}>
              <Image src="/about/during2.jpg" alt="Renovation in progress - new panels" width={800} height={600} style={{ objectFit: "cover", borderRadius: 8 }} />
            </div>
          </div>
        </div>

        <div className="gallery-group">
          <h3 className="gallery-heading">After</h3>
          <div className="gallery-row">
              <div style={{ position: "relative", width: "100%", flex: 1, minWidth: 200, cursor: "pointer" }} onClick={() => setZoomedImg({ src: "/about/after1.jpg", alt: "Renovated squash courts - Double Yellow" })}>
              <Image src="/about/after1.jpg" alt="Renovated squash courts - Double Yellow" width={800} height={600} style={{ objectFit: "cover", borderRadius: 8 }} />
            </div>
            <div style={{ position: "relative", width: "100%", flex: 1, minWidth: 200, cursor: "pointer" }} onClick={() => setZoomedImg({ src: "/about/after2.jpg", alt: "Finished court with seating area" })}>
              <Image src="/about/after2.jpg" alt="Finished court with seating area" width={800} height={600} style={{ objectFit: "cover", borderRadius: 8 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Lightbox */}
      {zoomedImg && (
        <div
          onClick={() => setZoomedImg(null)}
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
            cursor: "pointer",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoomedImg(null);
            }}
            style={{
              position: "fixed",
              top: "30px",
              right: "30px",
              background: "rgba(0, 0, 0, 0.5)",
              border: "2px solid #fff",
              borderRadius: "50%",
              color: "#fff",
              fontSize: "28px",
              cursor: "pointer",
              padding: "8px 12px",
              lineHeight: 1,
              zIndex: 1002,
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Close"
          >
            ✕
          </button>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}>
            <Image
              src={zoomedImg.src}
              alt={zoomedImg.alt}
              width={1200}
              height={900}
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                width: "auto",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
