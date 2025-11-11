import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About Us - Our Story and Mission",
  description: "Discover the story of Double Yellow Squash Club in Sofia - from renovation to revival. Learn about our mission to bring life back to Bulgarian squash through modern facilities and community focus.",
  openGraph: {
    title: "About Double Yellow Squash Club Sofia",
    description: "From dusty courts to a thriving squash community - discover our journey of renovating and reviving squash in Sofia.",
    images: [
      {
        url: "/about/after1.jpg",
        width: 1200,
        height: 630,
        alt: "Renovated squash courts at Double Yellow Club"
      }
    ]
  }
};
import { bg } from "@/lib/translations";

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsClub",
    "name": "Double Yellow Squash Club",
    "description": "Modern squash facility in Sofia offering professional courts, coaching, and community events.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sofia",
      "addressCountry": "BG"
    },
    "image": [
      "/about/after1.jpg",
      "/about/after2.jpg"
    ],
    "founder": {
      "@type": "Person",
      "name": "Jakub Kristl"
    },
    "url": "https://doubleyellow.bg",
    "sameAs": [
      "https://facebook.com/doubleyellowsquash",
      "https://instagram.com/doubleyellowsquash"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <section className="container about-section">
      <div className="membership-header">
        <h1 className="membership-title">{(bg as any).about.title}</h1>
        <div className="membership-sub">{(bg as any).about.subtitle}</div>
      </div>

      <div className="about-content">
        <p>
          <strong>Double Yellow Squash Club</strong> was born from a simple idea:
          to bring life back to the long-forgotten squash courts at the National
          Sports Academy in Sofia — and to build a modern, community-driven home
          for the game we love.
        </p>

        <p>
          Under <strong>Sport And Beyond EOOD</strong>, the project started as a
          renovation mission and quickly became a full-blown revival. The courts
          had seen better days — cracked walls, dim lights, warped floors. But
          what they lacked in shine, they made up for in potential.
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
            <img src="/about/before1.jpg" alt="Before renovation - worn walls" />
            <img src="/about/before2.jpg" alt="Before renovation - damage detail" />
          </div>
        </div>

        <div className="gallery-group">
          <h3 className="gallery-heading">During</h3>
          <div className="gallery-row">
            <img src="/about/during1.jpg" alt="Renovation in progress - front wall" />
            <img src="/about/during2.jpg" alt="Renovation in progress - new panels" />
          </div>
        </div>

        <div className="gallery-group">
          <h3 className="gallery-heading">After</h3>
          <div className="gallery-row">
            <img src="/about/after1.jpg" alt="Renovated squash courts - Double Yellow" />
            <img src="/about/after2.jpg" alt="Finished court with seating area" />
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
