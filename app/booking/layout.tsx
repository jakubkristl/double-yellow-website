import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Резервация на скуош корт | Бързо и лесно | Double Yellow",
  description:
    "Резервирай скуош корт в Double Yellow Squash Club в София. Моментално потвърждение, гъвкави часове и премиум кортове.",
  openGraph: {
    title: "Резервация на скуош корт | Бързо и лесно | Double Yellow",
    description:
      "Резервирай скуош корт в Double Yellow Squash Club в София. Моментално потвърждение, гъвкави часове и премиум кортове.",
    url: "https://www.doubleyellowsquash.com/booking",
    images: [
      {
        url: "https://www.doubleyellowsquash.com/og/double-yellow-social-1200x630.png",
        alt: "Double Yellow Squash Club social card",
      },
    ],
  },
  alternates: { canonical: "/booking" },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
