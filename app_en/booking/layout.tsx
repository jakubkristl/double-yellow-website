import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/booking",
  locale: "en",
  title: "Book a Squash Court in Sofia | Double Yellow",
  description:
    "Live squash court availability in Sofia. Double Yellow WSF courts, open 07:00–22:00. Book online with instant confirmation.",
});

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
