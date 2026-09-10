import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/store",
  locale: "en",
  title: "Store | Official Double Yellow Gear & Essentials",
  description:
    "Shop official Double Yellow gear, squash essentials, and club merchandise. Available only at the club in Sofia.",
});

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
