import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Магазин | Официална екипировка Double Yellow",
  description:
    "Пазарувай официална екипировка Double Yellow, скуош аксесоари и клубни артикули. Налични само в клуба в София.",
  openGraph: {
    title: "Магазин | Официална екипировка Double Yellow",
    description:
      "Пазарувай официална екипировка Double Yellow, скуош аксесоари и клубни артикули. Налични само в клуба в София.",
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
