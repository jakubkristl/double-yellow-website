import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/activities",
  locale: "en",
  title: 'Activities | Double Yellow Squash Club',
  description: 'Group sessions, kids squash, ladies nights, and club events at Double Yellow Squash Club in Sofia.',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
