export const dynamic = "force-static";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership Packs | Affordable Squash Access | Double Yellow",
  description:
    "Choose a membership pack (4, 8, or 12 courts per month) or a daytime pass. Flexible, affordable, valid 30 days. MultiSport and CoolFit accepted.",
  openGraph: {
    title: "Membership Packs | Affordable Squash Access | Double Yellow",
    description:
      "Choose a membership pack (4, 8, or 12 courts per month) or a daytime pass. Flexible, affordable, valid 30 days. MultiSport and CoolFit accepted.",
    url: "https://doubleyellow.bg/membership",
    images: [
      {
        url: "https://doubleyellow.bg/cards/front.png",
        alt: "Double Yellow membership card",
      },
    ],
  },
};

/**
 * Clean final layout:
 * - Smaller, centered shared card images
 * - Packs aligned with Booking design scale
 */

type Pack = {
  name: string;
  priceEUR: number;
  fun: string;
  daytime?: boolean;
};


import Image from "next/image";
import OptimizedImage from "@/components/OptimizedImage";

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
  },
  {
    name: "Monthly 12 Pack",
    priceEUR: 97,
    fun: "Three sessions a week — for people who call the court their second living room (we approve).",
  },
  {
    name: "Daytime Pass",
    priceEUR: 105,
    fun: "The lunchtime legend bundle. Sneak in a session, return a happier human.",
    daytime: true,
  },
];

export default function MembershipPage() {
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
  <div style={{ width: 320 }}>
    <OptimizedImage src={CARD_FRONT} alt="Card Front" width={320} height={200} style={{ borderRadius: 12, boxShadow: "0 0 20px rgba(0,0,0,0.5)" }} />
  </div>
  <div style={{ width: 320 }}>
    <OptimizedImage src={CARD_BACK} alt="Card Back" width={320} height={200} style={{ borderRadius: 12, boxShadow: "0 0 20px rgba(0,0,0,0.5)" }} />
  </div>
</div>


      <div className="price-grid">
        {PACKS.map((p) => (
          <article key={p.name} className="price-card">
            <h3>{p.name}</h3>
            <div className="price">{fmt.format(p.priceEUR)}</div>
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
    </section>
  );
}
