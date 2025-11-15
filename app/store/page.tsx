"use client";

import React from "react";
import { CATEGORIES } from "@/data/storeItems";
import Image from "next/image";

export default function StorePage() {
  // Filter out Drinks category temporarily
  const visibleCategories = CATEGORIES.filter((cat) => cat.title !== "Drinks");

  // Update this whenever you edit prices/items
  const lastUpdated = new Date("2025-11-02");
  const formattedDate = lastUpdated.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="container store-section">
      <div className="membership-header">
        <h1 className="page-title">Store</h1>
        <div className="membership-sub">
          Official Double Yellow gear and on-court essentials.
          <br />
          <strong>Available only at the club</strong> — see it, feel it, play it.
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
            <h2 className="store-cat">{cat.title}</h2>
            <div className="store-grid">
              {cat.items.map((item) => {
                const imgSrc = (item as any).image ?? iconByCategory[cat.title] ?? "/store/icons/racket.svg";
                const imgAlt = (item as any).imageAlt ?? item.name;
                return (
                  <div key={item.name} className="store-card">
                    <div className="store-card-image">
                      <Image src={imgSrc} alt={imgAlt} width={280} height={280} />
                    </div>
                    <div className="store-card-info">
                      <h3 className="store-card-name">{item.name}</h3>
                      <div className="store-card-price">
                        BGN {item.priceBGN.toFixed(2)}
                        <span className="store-card-eur"> ({item.priceEUR.toFixed(2)} €)</span>
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
        <em>Prices last updated on {formattedDate}</em>
      </div>
    </section>
  );
}
