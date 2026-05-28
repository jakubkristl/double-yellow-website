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
      title: "Избери дата и час",
      description:
        "Избери предпочитаните дата и час. Кортовете са достъпни всеки ден от 07:00 до 22:00.",
    },
    {
      number: 2,
      title: "Въведи своите данни",
      description:
        "Попълни име, имейл и телефонен номер.",
    },
    {
      number: 3,
      title: "Незабавно потвърждение",
      description:
        "Резервацията се потвърждава автоматично. Плащането е на рецепция при пристигане.",
    },
  ];

  return (
    <main className="container">
      <section className="page-hero">
        <h1 className="page-title">Резервации</h1>
        <p style={{ color: "#999", marginTop: "8px" }}>
          Бързи и лесни резервации за следващата ти скуош сесия.
        </p>
      </section>

      {/* How to Book Guide */}
      <section className="booking-guide">
        <h2 className="h2" style={{ marginBottom: "24px", textAlign: "center", color: "var(--accent)" }}>
          Как да резервираш в 3 стъпки
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
        Ако вградената система не се зареди,{" "}
        <a
          href={embedSrc}
          target="_blank"
          rel="noopener noreferrer"
        >
          отвори резервациите в нов раздел
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
          <strong style={{ color: "var(--accent)" }}>🎾 Резервираш целия корт:</strong> Когато резервираш час, запазваш целия корт. Двама играчи не е нужно да резервират отделно - достатъчно е един да направи резервацията.
        </p>
      </div>

      {/* Card wrapper just to match your site styling */}
      <div className="card" style={{ padding: 0, position: "relative", minHeight: "780px", background: "#ffffff" }}>
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
            background: "#ffffff",
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
            <p style={{ color: "#666", marginTop: "16px", fontSize: "14px" }}>
              Зареждаме системата за резервации...
            </p>
          </div>
        )}
        <iframe
          title="Double Yellow Squash - Резервации"
          src={embedSrc}
          width="100%"
          height={780}
          style={{ borderWidth: 0, display: "block", width: "100%", background: "#ffffff" }}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </main>
  );
}
