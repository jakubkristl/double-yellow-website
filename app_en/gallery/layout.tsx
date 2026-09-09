import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/gallery",
  locale: "en",
  title: "Photo Gallery | Double Yellow Squash Club",
  description:
    "Browse photos of our renovated squash courts, community events, activities, and players at Double Yellow Squash Club in Sofia.",
  image: "/hero/01.jpeg",
});

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
