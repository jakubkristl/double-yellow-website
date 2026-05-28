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
    name: "Месечен пакет 4",
    priceEUR: 36,
    fun: "Един мач седмично, за да не губиш ритъм. Раздвижване, замах, повторение - прогрес без пренатоварване.",
  },
  {
    name: "Месечен пакет 8",
    priceEUR: 66,
    fun: "Твоят ритъм два пъти седмично: пот, усмивка и онзи перфектен удар, за който говориш дни наред.",
    tag: "Най-популярен",
    valueNote: "Спестяваш 14 EUR спрямо 8 единични посещения.",
  },
  {
    name: "Месечен пакет 12",
    priceEUR: 97,
    fun: "Три посещения седмично - за хората, които наричат корта втори дом (и това ни харесва).",
    tag: "Най-добра стойност",
    valueNote: "Спестяваш 35 EUR спрямо 12 единични посещения.",
  },
  {
    name: "Дневен пас",
    priceEUR: 105,
    fun: "Легендарният пакет за обедни игри. Вмъкни тренировка и се върни по-зареден.",
    daytime: true,
  },
];

export default function MembershipPage() {
  const [zoomedImg, setZoomedImg] = useState<{ src: string; alt: string } | null>(null);
  const fmt = new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" });
  
  return (
    <section className="container">
      <div className="membership-header">
        <h1 className="page-title">Абонаментни пакети</h1>
        <div className="membership-sub">Валидни 30 дни от датата на покупка</div>
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
        <div style={{ width: 320, cursor: "pointer" }} onClick={() => setZoomedImg({ src: CARD_FRONT, alt: "Лице на карта" })}>
          <OptimizedImage src={CARD_FRONT} alt="Лице на карта" width={320} height={200} style={{ borderRadius: 12, boxShadow: "0 0 20px rgba(0,0,0,0.5)" }} />
        </div>
        <div style={{ width: 320, cursor: "pointer" }} onClick={() => setZoomedImg({ src: CARD_BACK, alt: "Гръб на карта" })}>
          <OptimizedImage src={CARD_BACK} alt="Гръб на карта" width={320} height={200} style={{ borderRadius: 12, boxShadow: "0 0 20px rgba(0,0,0,0.5)" }} />
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
            {p.daytime && <div className="badge">Веднъж дневно до 17:00</div>}
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
          <strong style={{ color: "var(--accent)" }}>💳 Физически карти:</strong> Всички абонаментни карти се получават на рецепция при покупка на пакет. Носи документ за самоличност и ела готов за игра.
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
