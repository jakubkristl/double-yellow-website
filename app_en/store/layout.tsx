import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store | Official Double Yellow Gear & Essentials",
  description:
    "Shop official Double Yellow gear, squash essentials, and club merchandise. Available only at the club in Sofia.",
  openGraph: {
    title: "Store | Official Double Yellow Gear & Essentials",
    description:
      "Shop official Double Yellow gear, squash essentials, and club merchandise. Available only at the club in Sofia.",
    url: "https://doubleyellow.bg/store",
  },
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
