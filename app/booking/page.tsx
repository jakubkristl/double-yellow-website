// app/booking/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking — Double Yellow Squash Club",
  description:
    "Reserve a squash court at Double Yellow Squash Club. Fast, simple booking via BookingGood.",
  alternates: { canonical: "/booking" },
};

export default function BookingPage() {
  const embedSrc =
    "https://sport.bookinggood.net/bg/embed/facility/44/72";

  return (
    <main className="container">
      <section className="page-hero">
        <h1 className="page-title">Booking</h1>
        <p className="muted">
          If the embed doesn’t load,{" "}
          <a
            href={embedSrc}
            target="_blank"
            rel="noopener noreferrer"
          >
            open the booking page in a new tab
          </a>
          .
        </p>
      </section>

      {/* Card wrapper just to match your site styling */}
      <div className="card" style={{ padding: 0 }}>
        <iframe
          title="Double Yellow Squash — Booking"
          src={embedSrc}
          width="100%"
          height={780}
          style={{ borderWidth: 0, display: "block", width: "100%" }}
          loading="lazy"
        />
      </div>
    </main>
  );
}
