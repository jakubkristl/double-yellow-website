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
  bgn: number;
  fun: string;
  daytime?: boolean;
};

const BGN_PER_EUR = 1.95583;
const toEUR = (bgn: number) => (bgn > 0 ? Math.round(bgn / BGN_PER_EUR) : 0);

const CARD_FRONT = "/cards/front.png";
const CARD_BACK = "/cards/back.png";

const PACKS: Pack[] = [
  {
    name: "Monthly 4 Pack",
    bgn: 70.41,
    fun: "One match a week to keep the rust away. Stretch, swing, repeat — progress without the burnout.",
  },
  {
    name: "Monthly 8 Pack",
    bgn: 129.08,
    fun: "Your twice-a-week rhythm: sweat, smile, and brag about that one perfect nick for days.",
  },
  {
    name: "Monthly 12 Pack",
    bgn: 189.72,
    fun: "Three sessions a week — for people who call the court their second living room (we approve).",
  },
  {
    name: "Daytime Pass",
    bgn: 205.36,
    fun: "The lunchtime legend bundle. Sneak in a session, return a happier human.",
    daytime: true,
  },
];

export default function MembershipPage() {
  return (
    <section className="container">
      <div className="membership-header">
        <h1 className="membership-title">Membership Packs</h1>
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
  <img
    src={CARD_FRONT}
    alt="Card Front"
    style={{
      width: "320px",
      height: "auto",
      borderRadius: "12px",
      boxShadow: "0 0 20px rgba(0,0,0,0.5)",
    }}
  />
  <img
    src={CARD_BACK}
    alt="Card Back"
    style={{
      width: "320px",
      height: "auto",
      borderRadius: "12px",
      boxShadow: "0 0 20px rgba(0,0,0,0.5)",
    }}
  />
</div>


      <div className="price-grid">
        {PACKS.map((p) => (
          <article key={p.name} className="price-card">
            <h3>{p.name}</h3>
            <div className="price price-bgn">{p.bgn.toFixed(2)} BGN</div>
            <div className="price-eur">{toEUR(p.bgn)} EUR</div>
            <div>{p.fun}</div>
            {p.daytime && <div className="badge">Once per day until 17:00</div>}
          </article>
        ))}
      </div>
    </section>
  );
}
