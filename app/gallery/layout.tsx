import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | Double Yellow Squash Club",
  description:
    "Browse photos of our renovated squash courts, community events, activities, and players at Double Yellow Squash Club in Sofia.",
  openGraph: {
    title: "Photo Gallery | Double Yellow Squash Club",
    description:
      "Browse photos of our renovated squash courts, community events, activities, and players at Double Yellow Squash Club in Sofia.",
    url: "https://doubleyellow.bg/gallery",
    images: [
      {
        url: "https://doubleyellow.bg/hero/01.jpg",
        alt: "Double Yellow Squash Club courts",
      },
    ],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
