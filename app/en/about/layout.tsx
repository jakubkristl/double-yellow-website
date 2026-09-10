import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/about",
  locale: "en",
  title: "About Double Yellow | Squash Club Sofia",
  description:
    "The story of Double Yellow Squash Club — renovated NSA courts and a community built around squash in Sofia.",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
