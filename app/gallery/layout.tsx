import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/gallery",
  title: "Галерия | Double Yellow Squash Club",
  description:
    "Разгледай снимки на реновираните ни скуош кортове, събития, активности и играчи в Double Yellow Squash Club в София.",
  image: "/hero/01.jpeg",
});

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
