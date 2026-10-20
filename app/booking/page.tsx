import BookingEmbedConversionBridge from "@/components/BookingEmbedConversionBridge";
import BookingEmbedSlot from "@/components/BookingEmbedSlot";
import { getBookingEmbedSrc } from "@/lib/booking";

export default function BookingPage() {
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
      description: "Попълни име, имейл и телефонен номер.",
    },
    {
      number: 3,
      title: "Незабавно потвърждение",
      description:
        "Резервацията се потвърждава автоматично. Плащането е на рецепция при пристигане.",
    },
  ];

  const fallbackEmbed = getBookingEmbedSrc({ theme: "dark" });

  return (
    <main className="container">
      <BookingEmbedConversionBridge localePrefix="" />
      <section className="page-hero" style={{ paddingBottom: 12 }}>
        <h1 className="page-title">Резервирай скуош корт в София</h1>
        <p style={{ color: "#999", marginTop: "8px" }}>
          Свободни часове в реално време в Double Yellow Squash Club. Пиковите
          слотове 18:00–21:00 се пълнят бързо — резервирай тук на сайта.
        </p>
      </section>

      <BookingEmbedSlot
        title="Double Yellow Squash - Резервации"
        loadingLabel="Зареждаме системата за резервации..."
      />

      <section className="booking-guide">
        <h2
          className="h2"
          style={{ marginBottom: "24px", textAlign: "center", color: "var(--accent)" }}
        >
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
        Предпочитай вградената форма по-горе — така потвърждението се отчита
        правилно. Ако не се зареди,{" "}
        <a href={fallbackEmbed} target="_blank" rel="noopener noreferrer">
          отвори резервациите в нов раздел
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
          <strong style={{ color: "var(--accent)" }}>Резервираш целия корт:</strong>{" "}
          Когато резервираш час, запазваш целия корт. Двама играчи не е нужно да
          резервират отделно — достатъчно е един да направи резервацията.
        </p>
      </div>
    </main>
  );
}
