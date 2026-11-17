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
  const facts = openSession ? sessionFacts(openSession, "bg") : null;
  const bookingSteps = events
    ? openSession && facts
      ? [
          {
            number: 1,
            title: "Сесията е отворена",
            description: facts.summary,
          },
          {
            number: 2,
            title: "Потвърди това място",
            description:
              "Календарът отдолу е резервацията на събитията за тази сесия. Натисни същия час, влез в BookingGood и потвърди едно място.",
          },
          {
            number: 3,
            title: "Пълна сесия не се резервира",
            description: "Ако свободните места свършат, тази сесия вече няма бутон за резервация.",
          },
        ]
      : [
          {
            number: 1,
            title: "Виж свободните места",
            description:
              "Списъкът показва следващите Mini squash и Social squash сесии, цената и колко места остават.",
          },
          {
            number: 2,
            title: "Отвори тази сесия",
            description:
              "Запази място отваря резервацията за избрания ден и час, не целия календар.",
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
    date: openSession?.date,
    time: openSession?.start,
  });

  return (
    <main className="container">
      <BookingEmbedConversionBridge localePrefix="" />
      <section className="page-hero" style={{ paddingBottom: 12 }}>
        <h1 className="page-title">
          {openSession
            ? openSession.title
            : events
              ? "Резервирай Mini squash или Social squash"
              : "Резервирай скуош корт в София"}
        </h1>
        <p style={{ color: "#999", marginTop: "8px" }}>
          {facts
            ? `${facts.when}. ${facts.price ? `${facts.price}. ` : ""}${facts.places}.`
            : events
              ? "Едно място в сесията. Запази място отваря тази сесия, а не целия календар."
              : "Свободни часове в реално време в Double Yellow Squash Club. Пиковите слотове 18:00–21:00 се пълнят бързо — резервирай тук на сайта."}
        </p>
        {requested && !requested.bookable ? (
          <p style={{ color: "#999", marginTop: "8px" }}>
            Тази сесия е пълна и не може да се резервира. Избери сесия със свободни места.
          </p>
        ) : null}
        {events && date && time && !requested ? (
          <p style={{ color: "#999", marginTop: "8px" }}>
            Тази сесия не е в календара. Показваме само часовете, които BookingGood има.
          </p>
        ) : null}
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

      {events ? <ClubSessions locale="bg" mode="book" selected={openSession} /> : null}

      <div id={events ? "event-calendar" : undefined}>
        {openSession && facts ? (
          <h2 className="h2" style={{ marginBottom: 12 }}>
            Потвърди {openSession.title} — {facts.when}
          </h2>
        ) : null}
        <BookingEmbedSlot
          title={
            openSession
              ? `Double Yellow Squash - ${openSession.title}`
              : events
                ? "Double Yellow Squash - Сесии"
                : "Double Yellow Squash - Резервации"
          }
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
            {openSession && facts
              ? `${facts.summary} `
              : "Mini squash и Social squash се резервират на човек. "}
            Сайтът не създава резервацията. Потвърждаваш я в календара на събитията, след като
            влезеш в BookingGood. Пълна сесия не може да се резервира.
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
