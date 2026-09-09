import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/privacy",
  locale: "en",
  title: 'Privacy Policy | Double Yellow',
  description: 'Privacy policy for Double Yellow Squash Club / Sport And Beyond EOOD.',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
