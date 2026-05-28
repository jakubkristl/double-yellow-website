"use client";

import React, { useState } from "react";
import { CATEGORIES } from "@/data/storeItems";
import type { Item } from "@/data/storeItems";
import Image from "next/image";
import OptimizedImage from "@/components/OptimizedImage";

export default function StorePage() {
  const [zoomedImg, setZoomedImg] = useState<{ src: string; alt: string } | null>(null);
  // Filter out Drinks category temporarily
  const visibleCategories = CATEGORIES.filter((cat) => cat.title !== "Drinks");
  const categoryLabels: Record<string, string> = {
    Rackets: "Ракети",
    Shoes: "Обувки",
    "Bags & Backpacks": "Сакове и раници",
    "Strings & Grips": "Кордажи и грипове",
    Apparel: "Облекло",
    Eyewear: "Очила",
    Rentals: "Наеми",
  };

  // Update this whenever you edit prices/items
  const lastUpdated = new Date("2026-01-26");
  const formattedDate = lastUpdated.toLocaleDateString("bg-BG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="container store-section">
      <div className="membership-header">
        <h1 className="page-title">Магазин</h1>
        <div className="membership-sub">
          Официална екипировка на Double Yellow и всичко необходимо за корта.
          <br />
          <strong>Налично в клуба</strong> - виж го, пробвай го, играй.
          <br />
          <span style={{ marginTop: "8px", display: "inline-block" }}>
            Поръчай по имейл{" "}
            <a href="mailto:jakub@doubleyellowsquash.com" style={{ color: "#ffcc00", textDecoration: "underline" }}>
              jakub@doubleyellowsquash.com
            </a>
            {" "}или на телефон{" "}
            <a 
              href="tel:+359896754014" 
              style={{ color: "#ffcc00", textDecoration: "underline" }}
            >
              0896 754 014
            </a>
            . Изпращаме с Еконт / Спиди.
          </span>
        </div>
      </div>

      {/* Category sections with card grids */}
      {visibleCategories.map((cat) => {
        const iconByCategory: Record<string, string> = {
          Rackets: "/store/icons/racket.svg",
          Shoes: "/store/icons/shoes.svg",
          "Bags & Backpacks": "/store/icons/bag.svg",
          "Strings & Grips": "/store/icons/strings.svg",
          Apparel: "/store/icons/apparel.svg",
          Eyewear: "/store/icons/eyewear.svg",
          Rentals: "/store/icons/rental.svg",
        };

        return (
          <div key={cat.title} className="store-category-block">
            <h2 className="store-cat">{categoryLabels[cat.title] ?? cat.title}</h2>
            <div className="store-grid">
              {cat.items.map((item) => {
                const imgSrc = (item as any).image ?? iconByCategory[cat.title] ?? "/store/icons/racket.svg";
                const imgAlt = (item as any).imageAlt ?? item.name;
                return (
                  <div key={item.name} className="store-card">
                    <div className="store-card-image" style={{ cursor: "pointer" }} onClick={() => setZoomedImg({ src: imgSrc, alt: imgAlt })}>
                      <OptimizedImage src={imgSrc} alt={imgAlt} width={280} height={280} />
                    </div>
                    <div className="store-card-info">
                      <h3 className="store-card-name">{item.name}</h3>
                      <div className="store-card-price">
                        {new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" }).format((item as Item).price)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="store-updated">
        <em>Цените са актуализирани на {formattedDate}</em>
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
