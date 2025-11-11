import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Squash Court | Fast & Easy Reservations | Double Yellow",
  description:
    "Reserve a squash court at Double Yellow Squash Club in Sofia. Instant booking, flexible times, premium courts.",
  openGraph: {
    title: "Book a Squash Court | Fast & Easy Reservations | Double Yellow",
    description:
      "Reserve a squash court at Double Yellow Squash Club in Sofia. Instant booking, flexible times, premium courts.",
    url: "https://doubleyellow.bg/booking",
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
