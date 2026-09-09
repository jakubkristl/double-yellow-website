import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/booking",
  locale: "en",
  title: "Book a Squash Court | Fast & Easy Reservations | Double Yellow",
  description:
    "Reserve a squash court at Double Yellow Squash Club in Sofia. Instant booking, flexible times, premium courts.",
});

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
