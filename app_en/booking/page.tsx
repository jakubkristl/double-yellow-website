"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import BookingEmbedConversionBridge from "@/components/BookingEmbedConversionBridge";
import { getBookingEmbedSrc } from "@/lib/booking";

function BookingEmbed() {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const embedSrc = useMemo(
    () =>
      getBookingEmbedSrc({
        day: searchParams.get("day"),
        time: searchParams.get("time"),
        theme: "dark",
      }),
    [searchParams],
  );

  return (
    <div
      className="card"
      style={{ padding: 0, position: "relative", minHeight: "780px", background: "#ffffff" }}
    >
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffffff",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "4px solid rgba(255, 204, 0, 0.2)",
              borderTop: "4px solid var(--accent)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ color: "#666", marginTop: "16px", fontSize: "14px" }}>
            Loading booking system…
          </p>
        </div>
      )}
      <iframe
        title="Double Yellow Squash - Booking"
        src={embedSrc}
        width="100%"
        height={780}
        style={{ borderWidth: 0, display: "block", width: "100%", background: "#ffffff" }}
        loading="eager"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}

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

      <Suspense
        fallback={
          <div className="card" style={{ minHeight: 200, padding: 24 }}>
            Loading…
          </div>
        }
      >
        <BookingEmbed />
      </Suspense>

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
