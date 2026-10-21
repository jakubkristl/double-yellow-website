"use client";

import { useEffect, useState } from "react";
import { listedStorePriceEur } from "@/lib/scheduledStorePrices";

const eur = new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" });

/** First paint matches the catalog so static HTML stays on today's price. After mount, Sofia time can switch racket rental. */
export function StoreItemPrice({ name, catalogPrice }: { name: string; catalogPrice: number }) {
  const [price, setPrice] = useState(catalogPrice);
  useEffect(() => {
    const sync = () => setPrice(listedStorePriceEur(name, catalogPrice));
    sync();
    const intervalId = window.setInterval(sync, 60_000);
    return () => window.clearInterval(intervalId);
  }, [name, catalogPrice]);
  return <>{eur.format(price)}</>;
}
