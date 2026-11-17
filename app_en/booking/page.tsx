import BookingEmbedConversionBridge from "@/components/BookingEmbedConversionBridge";
import BookingEmbedSlot from "@/components/BookingEmbedSlot";
import ClubSessions from "@/components/ClubSessions";
import FloatingContactActions from "@/components/FloatingContactActions";
import { getBookingEmbedSrc } from "@/lib/booking";

type BookingPageProps = {
  searchParams: Promise<{ facility?: string }>;
};

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const { facility } = await searchParams;
  const events = facility === "events";
  const bookingSteps = events
    ? [
        {
          number: 1,
          title: "See the places left",
          description:
            "The list shows the next Mini squash and Social squash sessions, the price, and how many places are left.",
        },
        {
          number: 2,
          title: "Choose that same session",
          description:
            "In the calendar, press the same time. A session with no places left cannot be booked.",
        },
        {
          number: 3,
          title: "Confirm one place",
          description:
            "Sign in to BookingGood the same way you book a court, then confirm one place for yourself.",
        },
      ]
    : [
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

  const fallbackEmbed = getBookingEmbedSrc({
    theme: "dark",
    facility: events ? "events" : "courts",
  });

  return (
    <main className="container">
      <BookingEmbedConversionBridge localePrefix="/en" />
      <section className="page-hero" style={{ paddingBottom: 12 }}>
        <h1 className="page-title">
          {events ? "Book Mini squash or Social squash" : "Book a squash court in Sofia"}
        </h1>
        <p style={{ color: "#999", marginTop: "8px" }}>
          {events
            ? "One place in the session. Places left are in the list, and you confirm the booking in the calendar below."
            : "Real-time free slots at Double Yellow Squash Club. Peak slots 18:00–21:00 fill fast — book on this page."}
        </p>
        {events ? (
          <p style={{ marginTop: 12 }}>
            <a href="/en/booking">Book a court</a>
          </p>
        ) : (
          <p style={{ marginTop: 12 }}>
            <a href="/en/booking?facility=events">Mini squash and Social squash</a>
          </p>
        )}
      </section>

      {events ? <ClubSessions locale="en" mode="book" /> : null}

      <div id={events ? "event-calendar" : undefined}>
        <BookingEmbedSlot
          title={events ? "Double Yellow Squash - Sessions" : "Double Yellow Squash - Booking"}
          loadingLabel="Loading booking system…"
        />
      </div>

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

      {events ? (
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
            <strong style={{ color: "var(--accent)" }}>You book one place:</strong> Mini
            squash and Social squash are booked per person. This site does not create the
            reservation. You confirm it in the calendar after signing in to BookingGood.
          </p>
        </div>
      ) : (
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
      )}
    </main>
  );
}
