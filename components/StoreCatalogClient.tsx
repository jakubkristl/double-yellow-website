"use client";

import React, { useState } from "react";
import Image from "next/image";
import OptimizedImage from "@/components/OptimizedImage";
import type { LiveStoreCategory, LiveStoreItem } from "@/lib/racketpointPrices";

type Locale = "bg" | "en";

type StoreCatalogClientProps = {
  locale: Locale;
  categories: LiveStoreCategory[];
  syncedAt: string;
  source: "racketpoint" | "fallback";
  matchedCount: number;
};

const BG_CATEGORY_LABELS: Record<string, string> = {
  Rackets: "Ракети",
  Shoes: "Обувки",
  "Bags & Backpacks": "Сакове и раници",
  "Strings & Grips": "Кордажи и грипове",
  Apparel: "Облекло",
  Eyewear: "Очила",
  Rentals: "Наеми",
};

const ICON_BY_CATEGORY: Record<string, string> = {
  Rackets: "/store/icons/racket.svg",
  Shoes: "/store/icons/shoes.svg",
  "Bags & Backpacks": "/store/icons/bag.svg",
  "Strings & Grips": "/store/icons/strings.svg",
  Apparel: "/store/icons/apparel.svg",
  Eyewear: "/store/icons/eyewear.svg",
  Rentals: "/store/icons/rental.svg",
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" }).format(value);
}

function StoreCard({
  item,
  categoryTitle,
  locale,
  onZoom,
}: {
  item: LiveStoreItem;
  categoryTitle: string;
  locale: Locale;
  onZoom: (src: string, alt: string) => void;
}) {
  const imgSrc = item.image ?? ICON_BY_CATEGORY[categoryTitle] ?? "/store/icons/racket.svg";
  const imgAlt = item.imageAlt ?? item.name;
  const showStrike =
    typeof item.listPrice === "number" && item.listPrice > item.price && item.priceFromRacketpoint;

  return (
    <div className="store-card">
      <div
        className="store-card-image"
        style={{ cursor: "pointer" }}
        onClick={() => onZoom(imgSrc, imgAlt)}
      >
        <OptimizedImage src={imgSrc} alt={imgAlt} width={280} height={280} />
      </div>
      <div className="store-card-info">
        <h3 className="store-card-name">{item.name}</h3>
        <div className="store-card-price">
          {showStrike ? (
            <>
              <span style={{ textDecoration: "line-through", opacity: 0.65, marginRight: 8 }}>
                {formatMoney(item.listPrice!)}
              </span>
              {formatMoney(item.price)}
            </>
          ) : (
            formatMoney(item.price)
          )}
        </div>
        {item.outOfStock ? (
          <div style={{ marginTop: 6, fontSize: 13, opacity: 0.85 }}>
            {locale === "bg" ? "Изчерпано в RacketPoint" : "Out of stock on RacketPoint"}
          </div>
        ) : null}
        {item.shopUrl ? (
          <a
            href={item.shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: 8,
              fontSize: 13,
              color: "#ffcc00",
              textDecoration: "underline",
            }}
          >
            {locale === "bg" ? "Купи в RacketPoint" : "Buy on RacketPoint"}
          </a>
        ) : null}
      </div>
    </div>
  );
}

export default function StoreCatalogClient({
  locale,
  categories,
  syncedAt,
  source,
  matchedCount,
}: StoreCatalogClientProps) {
  const [zoomedImg, setZoomedImg] = useState<{ src: string; alt: string } | null>(null);
  const visibleCategories = categories.filter((cat) => cat.title !== "Drinks");
  const date = new Date(syncedAt);
  const formattedDate = date.toLocaleDateString(locale === "bg" ? "bg-BG" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="container store-section">
      <div className="membership-header">
        <h1 className="page-title">{locale === "bg" ? "Магазин" : "Store"}</h1>
        <div className="membership-sub">
          {locale === "bg" ? (
            <>
              Официална екипировка на Double Yellow и всичко необходимо за корта.
              <br />
              <strong>Налично в клуба</strong> - виж го, пробвай го, играй.
              <br />
              <span style={{ marginTop: "8px", display: "inline-block" }}>
                Поръчай по имейл{" "}
                <a href="mailto:jakub@doubleyellowsquash.com" style={{ color: "#ffcc00", textDecoration: "underline" }}>
                  jakub@doubleyellowsquash.com
                </a>{" "}
                или на телефон{" "}
                <a href="tel:+359896754014" style={{ color: "#ffcc00", textDecoration: "underline" }}>
                  0896 754 014
                </a>
                . Изпращаме с Еконт / Спиди.
              </span>
            </>
          ) : (
            <>
              Official Double Yellow gear and on-court essentials.
              <br />
              <strong>Available at the club</strong> — see it, feel it, play it.
              <br />
              <span style={{ marginTop: "8px", display: "inline-block" }}>
                Order via email{" "}
                <a href="mailto:jakub@doubleyellowsquash.com" style={{ color: "#ffcc00", textDecoration: "underline" }}>
                  jakub@doubleyellowsquash.com
                </a>{" "}
                or phone{" "}
                <a href="tel:+359896754014" style={{ color: "#ffcc00", textDecoration: "underline" }}>
                  0896 754 014
                </a>
                . We ship via Ekont / Speedy.
              </span>
            </>
          )}
        </div>
      </div>

      {visibleCategories.map((cat) => (
        <div key={cat.title} className="store-category-block">
          <h2 className="store-cat">
            {locale === "bg" ? BG_CATEGORY_LABELS[cat.title] ?? cat.title : cat.title}
          </h2>
          <div className="store-grid">
            {cat.items.map((item) => (
              <StoreCard
                key={item.name}
                item={item}
                categoryTitle={cat.title}
                locale={locale}
                onZoom={(src, alt) => setZoomedImg({ src, alt })}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="store-updated">
        <em>
          {locale === "bg"
            ? source === "racketpoint"
              ? `Цените от RacketPoint · ${matchedCount} артикула синхронизирани · ${formattedDate}`
              : `Цените са от локалния каталог (RacketPoint недостъпен) · ${formattedDate}`
            : source === "racketpoint"
              ? `Prices from RacketPoint · ${matchedCount} items synced · ${formattedDate}`
              : `Showing local catalog prices (RacketPoint unreachable) · ${formattedDate}`}
        </em>
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
              height={1200}
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
