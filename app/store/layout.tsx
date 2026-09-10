import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/store",
  title: "Магазин | Официална екипировка Double Yellow",
  description:
    "Пазарувай официална екипировка Double Yellow, скуош аксесоари и клубни артикули. Налични само в клуба в София.",
});

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
