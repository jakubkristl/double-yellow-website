import BookingEmbedConversionBridge from "@/components/BookingEmbedConversionBridge";
import BookingEmbedSlot from "@/components/BookingEmbedSlot";
import ClubSessions, { sessionFacts } from "@/components/ClubSessions";
import FloatingContactActions from "@/components/FloatingContactActions";
import { getBookingEmbedSrc } from "@/lib/booking";
import { findClubSession, loadClubSessions } from "@/lib/club-sessions";

type BookingPageProps = {
  searchParams: Promise<{ facility?: string; date?: string; time?: string }>;
};

export default async function BookingPage({ searchParams }: BookingPageProps) {
  const { facility, date, time } = await searchParams;
  const events = facility === "events";
  const sessions = events ? await loadClubSessions() : null;
  const requested = sessions ? findClubSession(sessions.slots, date, time) : null;
  const openSession = requested?.bookable ? requested : null;
  const facts = openSession ? sessionFacts(openSession, "en") : null;
  const bookingSteps = events
    ? openSession && facts
      ? [
          {
            number: 1,
            title: "This session is open",
            description: facts.summary,
          },
          {
            number: 2,
            title: "Confirm this place",
            description:
              "The calendar below is the events booking for this session. Press the same time, sign in to BookingGood, and confirm one place.",
          },
          {
            number: 3,
            title: "A full session cannot be booked",
            description: "When no places are left, this session no longer has a booking button.",
          },
        ]
      : [
          {
            number: 1,
            title: "See the places left",
            description:
              "The list shows the next Mini squash and Social squash sessions, the price, and how many places are left.",
          },
          {
            number: 2,
            title: "Open that session",
            description: "Book a place opens the booking for that day and time, not the whole calendar.",
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
    date: openSession?.date,
    time: openSession?.start,
  });

  return (
    <main className="container">
      <BookingEmbedConversionBridge localePrefix="/en" />
      <section className="page-hero" style={{ paddingBottom: 12 }}>
        <h1 className="page-title">
          {openSession
            ? openSession.title
            : events
              ? "Book Mini squash or Social squash"
              : "Book a squash court in Sofia"}
        </h1>
        <p style={{ color: "#999", marginTop: "8px" }}>
          {facts
            ? `${facts.when}. ${facts.price ? `${facts.price}. ` : ""}${facts.places}.`
            : events
              ? "One place in the session. Book a place opens that session, not the whole calendar."
              : "Real-time free slots at Double Yellow Squash Club. Peak slots 18:00–21:00 fill fast — book on this page."}
        </p>
        {requested && !requested.bookable ? (
          <p style={{ color: "#999", marginTop: "8px" }}>
            This session is full and cannot be booked. Choose a session with places left.
          </p>
        ) : null}
        {events && date && time && !requested ? (
          <p style={{ color: "#999", marginTop: "8px" }}>
            This session is not on the calendar. Only times BookingGood has are shown.
          </p>
        ) : null}
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

      {events ? <ClubSessions locale="en" mode="book" selected={openSession} /> : null}

      <div id={events ? "event-calendar" : undefined}>
        {openSession && facts ? (
          <h2 className="h2" style={{ marginBottom: 12 }}>
            Confirm {openSession.title} — {facts.when}
          </h2>
        ) : null}
        <BookingEmbedSlot
          title={
            openSession
              ? `Double Yellow Squash - ${openSession.title}`
              : events
                ? "Double Yellow Squash - Sessions"
                : "Double Yellow Squash - Booking"
          }
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
            <strong style={{ color: "var(--accent)" }}>You book one place:</strong>{" "}
            {openSession && facts
              ? `${facts.summary} `
              : "Mini squash and Social squash are booked per person. "}
            This site does not create the reservation. You confirm it in the events calendar
            after signing in to BookingGood. A full session cannot be booked.
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
