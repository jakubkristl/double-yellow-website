import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/team",
  locale: "en",
  title: 'Team | Double Yellow Squash Club',
  description: 'Meet the coaches and team behind Double Yellow Squash Club in Sofia.',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
