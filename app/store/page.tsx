"use client";

import React, { useMemo, useState } from "react";
import { CATEGORIES } from "@/data/storeItems";
import Image from "next/image";

type OpenMap = Record<string, boolean>;

export default function StorePage() {
  // Track which sections are open
  const [open, setOpen] = useState<OpenMap>(() =>
    Object.fromEntries(CATEGORIES.map((c) => [c.title, true])) // default = all open
  );

  const allOpen = useMemo(
    () => Object.values(open).every(Boolean),
    [open]
  );

  const toggle = (title: string) =>
    setOpen((prev) => ({ ...prev, [title]: !prev[title] }));

  const setAll = (value: boolean) =>
    setOpen(Object.fromEntries(CATEGORIES.map((c) => [c.title, value])));

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

      {/* Controls */}
      <div className="store-controls">
        <button
          type="button"
          className="btn-ghost"
          onClick={() => setAll(true)}
          disabled={allOpen}
          aria-disabled={allOpen}
        >
          Expand all
        </button>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => setAll(false)}
          disabled={!allOpen}
          aria-disabled={!allOpen}
        >
          Collapse all
        </button>
      </div>

      {/* Accordions */}
      {CATEGORIES.map((cat) => {
        const isOpen = open[cat.title];
        return (
          <div key={cat.title} className="store-block">
            <button
              type="button"
              className="store-accordion"
              onClick={() => toggle(cat.title)}
              aria-expanded={isOpen}
              aria-controls={`panel-${cat.title}`}
            >
              <h2 className="store-cat">{cat.title}</h2>
              <svg
                className={`store-toggle-icon ${isOpen ? "open" : ""}`}
                width="22"
                height="22"
                viewBox="0 0 24 24"
                role="img"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M12 15.5L5 8.5l1.4-1.4L12 12.7l5.6-5.6L19 8.5z"
                />
              </svg>
            </button>

            <div
              id={`panel-${cat.title}`}
              className={`store-panel ${isOpen ? "panel-open" : "panel-closed"}`}
            >
              <ul className="store-list">
                {cat.items.map((p) => {
                  const iconByCategory: Record<string, string> = {
                    Rackets: "/store/icons/racket.svg",
                    Shoes: "/store/icons/shoes.svg",
                    "Bags & Backpacks": "/store/icons/bag.svg",
                    "Strings & Grips": "/store/icons/strings.svg",
                    Apparel: "/store/icons/apparel.svg",
                    Eyewear: "/store/icons/eyewear.svg",
                    Drinks: "/store/icons/drink.svg",
                    Rentals: "/store/icons/rental.svg",
                  };
                  const imgSrc = (p as any).image ?? iconByCategory[cat.title] ?? "/store/icons/racket.svg";
                  const imgAlt = (p as any).imageAlt ?? `${p.name}`;
                  return (
                    <li key={p.name} className="store-item">
                      <div className="store-left">
                        <div className="store-pic" aria-hidden={!imgAlt}>
                          <Image src={imgSrc} alt={imgAlt} width={56} height={56} />
                        </div>
                        <span className="store-name">{p.name}</span>
                      </div>
                      <span className="store-price">
                        BGN {p.priceBGN.toFixed(2)}
                        <span className="eur"> ({p.priceEUR.toFixed(2)} €)</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
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
