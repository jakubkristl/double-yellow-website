import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/",
  locale: "en",
  title: "Squash Club in Sofia — Double Yellow",
  description:
    "WSF-spec squash courts, coaching, events, and memberships in Sofia. Book your court or try your first session free.",
  image: "/hero/01.jpeg",
});
