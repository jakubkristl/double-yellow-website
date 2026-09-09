import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/cookies",
  title: 'Политика за бисквитки | Double Yellow',
  description: 'Информация за бисквитките, използвани на www.doubleyellowsquash.com.',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
