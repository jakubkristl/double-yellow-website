import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/terms",
  locale: "en",
  title: "Terms & Conditions | Double Yellow",
  description:
    "Terms and conditions for Double Yellow Squash Club and Sport And Beyond EOOD services.",
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
