import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/cookies",
  locale: "en",
  title: 'Cookie Policy | Double Yellow',
  description: 'Cookie policy for www.doubleyellowsquash.com.',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
