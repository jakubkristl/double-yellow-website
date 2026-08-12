import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery | Double Yellow Squash Club",
  description:
    "Browse photos of our renovated squash courts, community events, activities, and players at Double Yellow Squash Club in Sofia.",
  openGraph: {
    title: "Photo Gallery | Double Yellow Squash Club",
    description:
      "Browse photos of our renovated squash courts, community events, activities, and players at Double Yellow Squash Club in Sofia.",
    url: "https://www.doubleyellowsquash.com/gallery",
    images: [
      {
        url: "https://www.doubleyellowsquash.com/hero/01.jpeg",
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
