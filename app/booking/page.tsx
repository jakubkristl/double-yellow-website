// app/booking/page.tsx
"use client";

import { useState } from "react";

export default function BookingPage() {
  const [isLoading, setIsLoading] = useState(true);
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
      <div className="card" style={{ padding: 0, position: "relative", minHeight: "780px" }}>
        {isLoading && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#1a1a1a",
            zIndex: 10,
          }}>
            <div style={{
              width: "50px",
              height: "50px",
              border: "4px solid rgba(255, 204, 0, 0.2)",
              borderTop: "4px solid var(--accent)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }} />
            <p style={{ color: "#999", marginTop: "16px", fontSize: "14px" }}>
              Loading booking system...
            </p>
          </div>
        )}
        <iframe
          title="Double Yellow Squash — Booking"
          src={embedSrc}
          width="100%"
          height={780}
          style={{ borderWidth: 0, display: "block", width: "100%" }}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </main>
  );
}
