import { CATEGORIES, type Category, type Item } from "@/data/storeItems";

export type LiveStoreItem = Item & {
  /** True when price/stock came from RacketPoint. */
  priceFromRacketpoint: boolean;
  listPrice?: number;
  stock?: number;
  outOfStock?: boolean;
  shopUrl?: string;
};

export type LiveStoreCategory = {
  title: string;
  items: LiveStoreItem[];
};

export type LiveStoreCatalog = {
  categories: LiveStoreCategory[];
  syncedAt: string;
  source: "racketpoint" | "fallback";
  matchedCount: number;
};

type PublicCatalogProduct = {
  id: string;
  slug: string;
  title: string;
  sellingPrice: number;
  discountPrice: number | null;
  stock: number;
  sourceSku: string | null;
};

const DEFAULT_RACKETPOINT_URL = "https://www.racketpoint.bg";

function racketpointBaseUrl() {
  return (process.env.RACKETPOINT_API_BASE_URL ?? DEFAULT_RACKETPOINT_URL).replace(/\/$/, "");
}

function catalogKeysForId(racketpointId: string) {
  const bare = racketpointId.replace(/^POS-/i, "");
  return [bare, `POS-${bare}`, racketpointId];
}

function indexPublicCatalog(products: PublicCatalogProduct[]) {
  const byKey = new Map<string, PublicCatalogProduct>();

  for (const product of products) {
    byKey.set(product.id, product);
    if (product.sourceSku) {
      byKey.set(product.sourceSku, product);
      byKey.set(`POS-${product.sourceSku}`, product);
    }
    const withoutPrefix = product.id.replace(/^POS-/i, "");
    if (withoutPrefix !== product.id) {
      byKey.set(withoutPrefix, product);
    }
  }

  return byKey;
}

function effectiveSellPrice(product: PublicCatalogProduct) {
  const list = Number(product.sellingPrice);
  const promo = product.discountPrice == null ? null : Number(product.discountPrice);
  if (promo != null && Number.isFinite(promo) && promo > 0 && Number.isFinite(list) && promo < list) {
    return promo;
  }
  return Number.isFinite(list) ? list : 0;
}

export async function fetchRacketpointPublicCatalog(): Promise<PublicCatalogProduct[]> {
  const url = `${racketpointBaseUrl()}/api/catalog/public`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 120, tags: ["racketpoint-prices"] },
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      // Fallback for environments that do not yet have /api/catalog/public deployed.
      const legacy = await fetch(`${racketpointBaseUrl()}/api/products`, {
        next: { revalidate: 120, tags: ["racketpoint-prices"] },
        headers: { Accept: "application/json" },
      });
      if (!legacy.ok) {
        return [];
      }
      const legacyRows = (await legacy.json()) as Array<Record<string, unknown>>;
      return legacyRows.map((row) => ({
        id: String(row.id ?? ""),
        slug: String(row.slug ?? ""),
        title: String(row.title ?? ""),
        sellingPrice: Number(row.sellingPrice ?? row.selling_price ?? 0),
        discountPrice:
          row.discountPrice == null && row.discount_price == null
            ? null
            : Number(row.discountPrice ?? row.discount_price),
        stock: Number(row.stock ?? 0),
        sourceSku:
          row.attributes && typeof row.attributes === "object" && typeof (row.attributes as any).sourceSku === "string"
            ? String((row.attributes as any).sourceSku)
            : null,
      }));
    }

    return (await response.json()) as PublicCatalogProduct[];
  } catch {
    return [];
  }
}

function applyLivePrice(item: Item, byKey: Map<string, PublicCatalogProduct>): LiveStoreItem {
  if (!item.racketpointId) {
    return { ...item, priceFromRacketpoint: false };
  }

  let match: PublicCatalogProduct | undefined;
  for (const key of catalogKeysForId(item.racketpointId)) {
    match = byKey.get(key);
    if (match) break;
  }

  if (!match) {
    return { ...item, priceFromRacketpoint: false };
  }

  const listPrice = Number(match.sellingPrice);
  const price = effectiveSellPrice(match);
  const stock = Number(match.stock ?? 0);

  return {
    ...item,
    price: Number.isFinite(price) ? price : item.price,
    listPrice: Number.isFinite(listPrice) ? listPrice : undefined,
    stock,
    outOfStock: stock <= 0,
    priceFromRacketpoint: true,
    shopUrl: `${racketpointBaseUrl()}/product/${encodeURIComponent(match.id)}`,
  };
}

export async function getLiveStoreCatalog(): Promise<LiveStoreCatalog> {
  const products = await fetchRacketpointPublicCatalog();
  const byKey = indexPublicCatalog(products);
  let matchedCount = 0;

  const categories: LiveStoreCategory[] = CATEGORIES.map((category: Category) => ({
    title: category.title,
    items: category.items.map((item) => {
      const live = applyLivePrice(item, byKey);
      if (live.priceFromRacketpoint) {
        matchedCount += 1;
      }
      return live;
    }),
  }));

  return {
    categories,
    syncedAt: new Date().toISOString(),
    source: products.length > 0 ? "racketpoint" : "fallback",
    matchedCount,
  };
}
