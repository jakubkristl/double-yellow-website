import type { Metadata } from "next";
import BookingSuccessTracker from "@/components/BookingSuccessTracker";
import styles from "./styles.module.css";

export const metadata: Metadata = {
  title: "Резервацията е потвърдена | Double Yellow",
  description:
    "Резервацията ти е потвърдена. Очакваме те на корта в Double Yellow Squash Club.",
  alternates: { canonical: "/booking/success" },
};

type Props = {
  searchParams?: Promise<{
    booking_id?: string;
    reservation_id?: string;
    id?: string;
  }>;
};

export default async function BookingSuccessPage({ searchParams }: Props) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const bookingId =
    resolvedSearchParams?.booking_id ??
    resolvedSearchParams?.reservation_id ??
    resolvedSearchParams?.id;

  return (
    <section className={`container ${styles.successSection}`}>
      <BookingSuccessTracker bookingId={bookingId} />

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
