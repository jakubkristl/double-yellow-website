import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/booking",
  title: "Резервация на скуош корт | Бързо и лесно | Double Yellow",
  description:
    "Резервирай скуош корт в Double Yellow Squash Club в София. Моментално потвърждение, гъвкави часове и премиум кортове.",
});

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
