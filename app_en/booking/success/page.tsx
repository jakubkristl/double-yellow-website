import type { Metadata } from "next";
import BookingSuccessTracker from "@/components/BookingSuccessTracker";
import styles from "./styles.module.css";

export const metadata: Metadata = {
  title: "Booking Confirmed | Double Yellow",
  description:
    "Your booking has been confirmed. See you on court at Double Yellow Squash Club.",
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

      <h1 className="page-title">Booking Confirmed</h1>
      <p className={`lead ${styles.leadSpacing}`}>
        Thank you. Your court is reserved and we look forward to seeing you.
      </p>

      <p className={`muted ${styles.noteSpacing}`}>
        If you need to change your reservation, call us at +359 896 754 014.
      </p>
    </section>
  );
}
