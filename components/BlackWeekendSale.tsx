import { isBlackWeekendSaleActive } from "@/lib/blackWeekendSale";

const eur = new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" });

export function BlackWeekendSticker({ active, pack = false }: { active: boolean; pack?: boolean }) {
  if (!active) return null;
  return <span className={pack ? "bw-sticker bw-sticker--pack" : "bw-sticker"}>Black Weekend</span>;
}

/** Shelf price, with the sale price beside it while the window is open. */
export function BlackWeekendPrices({ shelf, sale }: { shelf: number; sale: number | null }) {
  if (sale == null) return <>{eur.format(shelf)}</>;
  return (
    <span className="bw-prices">
      <span className="bw-was">{eur.format(shelf)}</span>
      <span className="bw-now">{eur.format(sale)}</span>
    </span>
  );
}

export function BlackWeekendOfferTag({ locale, active }: { locale: "bg" | "en"; active: boolean }) {
  if (!active) return null;
  return <p className="bw-offer">{locale === "bg" ? "Специална оферта" : "Special Offer"}</p>;
}

export function BlackWeekendDisclaimer({ locale }: { locale: "bg" | "en" }) {
  if (!isBlackWeekendSaleActive()) return null;
  return (
    <p className="bw-disclaimer">
      {locale === "bg" ? "Покупките зависят от наличността." : "Purchases depend on stock availability."}
    </p>
  );
}
