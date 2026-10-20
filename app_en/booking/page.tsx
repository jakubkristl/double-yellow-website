import BookingEmbedConversionBridge from "@/components/BookingEmbedConversionBridge";
import BookingEmbedSlot from "@/components/BookingEmbedSlot";
import FloatingContactActions from "@/components/FloatingContactActions";
import { getBookingEmbedSrc } from "@/lib/booking";

export default function BookingPage() {
  const bookingSteps = [
    {
      number: 1,
      title: "Pick date and time",
      description: "Courts are available every day from 07:00 to 22:00.",
    },
    {
      number: 2,
      title: "Enter your details",
      description: "Name, email, and phone number.",
    },
    {
      number: 3,
      title: "Instant confirmation",
      description: "Booking confirms automatically. Pay at reception on arrival.",
    },
  ];

  const fallbackEmbed = getBookingEmbedSrc({ theme: "dark" });

  return (
    <main className="container">
      <BookingEmbedConversionBridge localePrefix="/en" />
      <section className="page-hero" style={{ paddingBottom: 12 }}>
        <h1 className="page-title">Book a squash court in Sofia</h1>
        <p style={{ color: "#999", marginTop: "8px" }}>
          Real-time free slots at Double Yellow Squash Club. Peak slots
          18:00–21:00 fill fast — book on this page.
        </p>
      </section>

      <BookingEmbedSlot
        title="Double Yellow Squash - Booking"
        loadingLabel="Loading booking system…"
      />

      <FloatingContactActions placement="inline" />

      <section className="booking-guide">
        <h2
          className="h2"
          style={{ marginBottom: "24px", textAlign: "center", color: "var(--accent)" }}
        >
          How to book in 3 steps
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
        Prefer the embedded form above so confirmation is tracked correctly. If
        it fails to load,{" "}
        <a href={fallbackEmbed} target="_blank" rel="noopener noreferrer">
          open booking in a new tab
        </a>
        .
      </p>

      <div
        style={{
          marginBottom: "24px",
          padding: "16px 20px",
          backgroundColor: "rgba(255, 204, 0, 0.05)",
          borderLeft: "4px solid var(--accent)",
          borderRadius: "8px",
          color: "#ddd",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "clamp(14px, 1vw + 12px, 16px)",
            lineHeight: "1.6",
          }}
        >
          <strong style={{ color: "var(--accent)" }}>You book the whole court:</strong>{" "}
          One reservation holds the court for two players — no need for both to
          book separately.
        </p>
      </div>
    </main>
  );
}
