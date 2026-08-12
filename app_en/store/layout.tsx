import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store | Official Double Yellow Gear & Essentials",
  description:
    "Shop official Double Yellow gear, squash essentials, and club merchandise. Available only at the club in Sofia.",
  openGraph: {
    title: "Store | Official Double Yellow Gear & Essentials",
    description:
      "Shop official Double Yellow gear, squash essentials, and club merchandise. Available only at the club in Sofia.",
    url: "https://www.doubleyellowsquash.com/store",
    images: [
      {
        url: "https://www.doubleyellowsquash.com/og/double-yellow-social-1200x630.png",
        alt: "Double Yellow Squash Club social card",
      },
    ],
  },
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
