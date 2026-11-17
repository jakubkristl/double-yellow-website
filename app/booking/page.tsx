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
          title: "Виж свободните места",
          description:
            "Списъкът показва следващите Mini squash и Social squash сесии, цената и колко места остават.",
        },
        {
          number: 2,
          title: "Избери същата сесия",
          description:
            "В календара натисни същия час. Сесия без свободни места не може да се резервира.",
        },
        {
          number: 3,
          title: "Потвърди едно място",
          description:
            "Влизаш в BookingGood както при резервация на корт и потвърждаваш едно място за себе си.",
        },
      ]
    : [
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

  const fallbackEmbed = getBookingEmbedSrc({
    theme: "dark",
    facility: events ? "events" : "courts",
  });

  return (
    <main className="container">
      <BookingEmbedConversionBridge localePrefix="" />
      <section className="page-hero" style={{ paddingBottom: 12 }}>
        <h1 className="page-title">
          {events ? "Резервирай Mini squash или Social squash" : "Резервирай скуош корт в София"}
        </h1>
        <p style={{ color: "#999", marginTop: "8px" }}>
          {events
            ? "Едно място в сесията. Свободните места са в списъка, а резервацията се потвърждава в календара отдолу."
            : "Свободни часове в реално време в Double Yellow Squash Club. Пиковите слотове 18:00–21:00 се пълнят бързо — резервирай тук на сайта."}
        </p>
        {events ? (
          <p style={{ marginTop: 12 }}>
            <a href="/booking">Резервирай корт</a>
          </p>
        ) : (
          <p style={{ marginTop: 12 }}>
            <a href="/booking?facility=events">Mini squash и Social squash</a>
          </p>
        )}
      </section>

      {events ? <ClubSessions locale="bg" mode="book" /> : null}

      <div id={events ? "event-calendar" : undefined}>
        <BookingEmbedSlot
          title={events ? "Double Yellow Squash - Сесии" : "Double Yellow Squash - Резервации"}
          loadingLabel="Зареждаме системата за резервации..."
        />
      </div>

      <FloatingContactActions placement="inline" />

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
            <strong style={{ color: "var(--accent)" }}>Запазваш едно място:</strong>{" "}
            Mini squash и Social squash се резервират на човек. Сайтът не създава
            резервацията. Потвърждаваш я в календара, след като влезеш в BookingGood.
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
            <strong style={{ color: "var(--accent)" }}>Резервираш целия корт:</strong>{" "}
            Когато резервираш час, запазваш целия корт. Двама играчи не е нужно да
            резервират отделно — достатъчно е един да направи резервацията.
          </p>
        </div>
      )}
    </main>
  );
}
