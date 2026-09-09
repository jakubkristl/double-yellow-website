import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/activities",
  title: 'Активности | Double Yellow Squash Club',
  description: 'Групови тренировки, детски скуош, дамски сесии и събития в Double Yellow Squash Club в София.',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
