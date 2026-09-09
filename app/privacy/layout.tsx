import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/privacy",
  title: 'Политика за поверителност | Double Yellow',
  description: 'Политика за поверителност на Double Yellow Squash Club / Sport And Beyond EOOD.',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
