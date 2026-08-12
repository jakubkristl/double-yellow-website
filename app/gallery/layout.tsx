import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Галерия | Double Yellow Squash Club",
  description:
    "Разгледай снимки на реновираните ни скуош кортове, събития, активности и играчи в Double Yellow Squash Club в София.",
  openGraph: {
    title: "Галерия | Double Yellow Squash Club",
    description:
      "Разгледай снимки на реновираните ни скуош кортове, събития, активности и играчи в Double Yellow Squash Club в София.",
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
