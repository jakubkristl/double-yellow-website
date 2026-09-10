import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/membership",
  title: "Абонаменти | Double Yellow Squash Club",
  description:
    "Абонаментни пакети за скуош в София — кортове, тренировки и гъвкави опции в Double Yellow.",
});

export default function MembershipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
