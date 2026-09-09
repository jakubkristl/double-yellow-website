import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/team",
  title: 'Екип | Double Yellow Squash Club',
  description: 'Запознай се с треньорите и екипа на Double Yellow Squash Club в София.',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
