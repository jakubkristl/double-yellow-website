import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/booking",
  title: "Резервирай скуош корт в София | Double Yellow",
  description:
    "Живи свободни часове за скуош в София. Double Yellow — WSF кортове, 07:00–22:00. Резервирай онлайн с моментално потвърждение.",
});

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
