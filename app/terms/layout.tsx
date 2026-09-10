import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/terms",
  title: "Общи условия | Double Yellow",
  description:
    "Общи условия за ползване на Double Yellow Squash Club и услугите на Sport And Beyond EOOD.",
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
