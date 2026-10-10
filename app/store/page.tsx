import StoreCatalogClient from "@/components/StoreCatalogClient";
import { getLiveStoreCatalog } from "@/lib/racketpointPrices";

export default async function StorePage() {
  const catalog = await getLiveStoreCatalog();

  return (
    <StoreCatalogClient
      locale="bg"
      categories={catalog.categories}
      syncedAt={catalog.syncedAt}
      source={catalog.source}
      matchedCount={catalog.matchedCount}
    />
  );
}
