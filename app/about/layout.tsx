import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/about",
  title: 'За Double Yellow | Скуош клуб София',
  description: 'Историята на Double Yellow Squash Club — реновация на кортовете в НСА и общност около скуоша в София.',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
