import type { Metadata } from "next";
import styles from "./styles.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/booking/success",
  title: "Резервацията е потвърдена | Double Yellow",
  description:
    "Резервацията ти е потвърдена. Очакваме те на корта в Double Yellow Squash Club.",
  robots: { index: false, follow: false },
});

export default function BookingSuccessPage() {
  return (
    <section className={`container ${styles.successSection}`}>
      <h1 className="page-title">Резервацията е потвърдена</h1>
      <p className={`lead ${styles.leadSpacing}`}>
        Благодарим ти. Кортът е запазен и очакваме да се видим скоро.
      </p>

      <p className={`muted ${styles.noteSpacing}`}>
        Ако искаш да промениш резервацията, обади ни се на +359 896 754 014.
      </p>
    </section>
  );
}
