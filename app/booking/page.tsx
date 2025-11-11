// app/booking/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Squash Court | Fast & Easy Reservations | Double Yellow",
  description:
    "Reserve a squash court at Double Yellow Squash Club in Sofia. Instant booking, flexible times, premium courts.",
  openGraph: {
    title: "Book a Squash Court | Fast & Easy Reservations | Double Yellow",
    description:
      "Reserve a squash court at Double Yellow Squash Club in Sofia. Instant booking, flexible times, premium courts.",
    url: "https://doubleyellow.bg/booking",
  },
  alternates: { canonical: "/booking" },
};

export default function BookingPage() {
  const embedSrc =
    "https://sport.bookinggood.net/bg/embed/facility/44/72";

  const bookingSteps = [
    {
      number: 1,
      title: "Choose Date & Time",
      description:
        "Select your preferred date and time. Courts available 07:00–22:00 daily.",
    },
    {
      number: 2,
      title: "Enter Your Details",
      description:
        "Provide your name, email, and phone number.",
    },
    {
      number: 3,
      title: "Instant Confirmation",
      description:
        "Your booking is confirmed automatically. Pay at reception when you arrive.",
    },
  ];

  return (
    <main className="container">
      <section className="page-hero">
        <h1 className="page-title">Booking</h1>
        <p style={{ color: "#999", marginTop: "8px" }}>
          Fast, easy reservations for your next squash session.
        </p>
      </section>

      {/* How to Book Guide */}
      <section className="booking-guide">
        <h2 className="h2" style={{ marginBottom: "24px", textAlign: "center", color: "var(--accent)" }}>
          How to Book in 3 Steps
        </h2>

        <div className="steps-grid">
          {bookingSteps.map((step) => (
            <div key={step.number} className="step-card">
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="muted" style={{ marginTop: "32px", marginBottom: "24px" }}>
        If the embed doesn't load,{" "}
        <a
          href={embedSrc}
          target="_blank"
          rel="noopener noreferrer"
        >
          open the booking page in a new tab
        </a>
        .
      </p>

      {/* Note about booking the whole court */}
      <div style={{
        marginBottom: "24px",
        padding: "16px 20px",
        backgroundColor: "rgba(255, 204, 0, 0.05)",
        borderLeft: "4px solid var(--accent)",
        borderRadius: "8px",
        color: "#ddd",
      }}>
        <p style={{ margin: 0, fontSize: "clamp(14px, 1vw + 12px, 16px)", lineHeight: "1.6" }}>
          <strong style={{ color: "var(--accent)" }}>🎾 Book the whole court:</strong> When you book a time slot, you reserve the entire court. Two players don't need to book separately—just one person books, and both can play!
        </p>
      </div>

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
