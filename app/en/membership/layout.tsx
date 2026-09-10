import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/membership",
  locale: "en",
  title: "Memberships | Double Yellow Squash Club",
  description:
    "Squash membership packs in Sofia — courts, coaching, and flexible options at Double Yellow.",
});

export default function MembershipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
