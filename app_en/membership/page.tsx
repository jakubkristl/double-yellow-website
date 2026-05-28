"use client";

import { useState } from "react";
import Image from "next/image";
import OptimizedImage from "@/components/OptimizedImage";

type Pack = {
  name: string;
  priceEUR: number;
  fun: string;
  daytime?: boolean;
  tag?: string;
  valueNote?: string;
};

const CARD_FRONT = "/cards/front.png";
const CARD_BACK = "/cards/back.png";

const PACKS: Pack[] = [
  {
    name: "Monthly 4 Pack",
    priceEUR: 36,
    fun: "One match a week to keep the rust away. Stretch, swing, repeat — progress without the burnout.",
  },
  {
    name: "Monthly 8 Pack",
    priceEUR: 66,
    fun: "Your twice-a-week rhythm: sweat, smile, and brag about that one perfect nick for days.",
    tag: "Most Popular",
    valueNote: "Save EUR 14 vs 8 single sessions.",
  },
  {
    name: "Monthly 12 Pack",
    priceEUR: 97,
    fun: "Three sessions a week — for people who call the court their second living room (we approve).",
    tag: "Best Value",
    valueNote: "Save EUR 35 vs 12 single sessions.",
  },
  {
    name: "Daytime Pass",
    priceEUR: 105,
    fun: "The lunchtime legend bundle. Sneak in a session, return a happier human.",
    daytime: true,
  },
];

export default function MembershipPage() {
  const [zoomedImg, setZoomedImg] = useState<{ src: string; alt: string } | null>(null);
  const fmt = new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" });
  
  return (
    <section className="container">
      <div className="membership-header">
        <h1 className="page-title">Membership Packs</h1>
        <div className="membership-sub">Valid 30 days from purchase</div>
      </div>

      {/* Shared card preview */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
          margin: "40px 0",
          flexWrap: "wrap",
        }}
      >
        <div style={{ width: 320, cursor: "pointer" }} onClick={() => setZoomedImg({ src: CARD_FRONT, alt: "Card Front" })}>
          <OptimizedImage src={CARD_FRONT} alt="Card Front" width={320} height={200} style={{ borderRadius: 12, boxShadow: "0 0 20px rgba(0,0,0,0.5)" }} />
        </div>
        <div style={{ width: 320, cursor: "pointer" }} onClick={() => setZoomedImg({ src: CARD_BACK, alt: "Card Back" })}>
          <OptimizedImage src={CARD_BACK} alt="Card Back" width={320} height={200} style={{ borderRadius: 12, boxShadow: "0 0 20px rgba(0,0,0,0.5)" }} />
        </div>
      </div>

      <div className="price-grid">
        {PACKS.map((p) => (
          <article key={p.name} className={`price-card ${p.tag ? "price-card-convert" : ""}`}>
            <h3>{p.name}</h3>
            {p.tag && <div className="membership-tag">{p.tag}</div>}
            <div className="price">{fmt.format(p.priceEUR)}</div>
            {p.valueNote && <div className="membership-value-note">{p.valueNote}</div>}
            <div>{p.fun}</div>
            {p.daytime && <div className="badge">Once per day until 17:00</div>}
          </article>
        ))}
      </div>

      {/* Note about cards at reception */}
      <div style={{
        marginTop: "40px",
        padding: "20px",
        backgroundColor: "rgba(255, 204, 0, 0.08)",
        borderLeft: "4px solid var(--accent)",
        borderRadius: "8px",
        color: "#ddd",
      }}>
        <p style={{ margin: 0, fontSize: "clamp(14px, 1vw + 12px, 16px)", lineHeight: "1.6" }}>
          <strong style={{ color: "var(--accent)" }}>💳 Physical Cards:</strong> All membership cards are available at the reception desk when you purchase your pack. Bring your ID and come ready to play!
        </p>
      </div>

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
