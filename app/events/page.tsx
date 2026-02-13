import OptimizedImage from "@/components/OptimizedImage";
import Link from "next/link";
import type { Metadata } from "next";
import {
  DOUBLE_YELLOW_OPEN_POSTER,
  DOUBLE_YELLOW_OPEN_URL,
  isDoubleYellowOpenActive,
} from "@/lib/doubleYellowOpen";

export const metadata: Metadata = {
  title: "Special Events & Coaching Visits | Double Yellow Squash",
  description:
    "Attend guest coaching visits, workshops, and special tournaments at Double Yellow Squash Club. Meet expert coaches and challenge opponents.",
  openGraph: {
    title: "Special Events & Coaching Visits | Double Yellow Squash",
    description:
      "Attend guest coaching visits, workshops, and special tournaments at Double Yellow Squash Club. Meet expert coaches and challenge opponents.",
    url: "https://doubleyellow.bg/events",
    images: [
      {
        url: "https://doubleyellow.bg/events/double-yellow-open-tournament.png",
        alt: "Double Yellow Open tournament poster",
      },
    ],
  },
};

export const revalidate = 3600;

export default function EventsPage() {
  const showDoubleYellowOpen = isDoubleYellowOpenActive();
  const showArchivedDoubleYellowOpen = !showDoubleYellowOpen;

  return (
    <main>
      <section className="container container--narrow">
        <h1 className="page-title">Events</h1>
        <p className="subtitle">One-off events, workshops & guest visits.</p>

        {showDoubleYellowOpen && (
          <div className="event-card" style={{ marginBottom: '2rem' }}>
            <Link
              href={DOUBLE_YELLOW_OPEN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Double Yellow Open registration"
              style={{ display: 'block', marginBottom: '1.5rem' }}
            >
              <OptimizedImage
                src={DOUBLE_YELLOW_OPEN_POSTER}
                alt="Double Yellow Open tournament on 14-15 March 2026"
                width={1536}
                height={1024}
                className="event-card__image"
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                priority
              />
            </Link>
            <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>🚨 Double Yellow Open is HERE! 🚨</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              Вторият турнир от Bulgarian Squash Tour идва с важен ъпдейт.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              📅 <strong>Нова дата: 14–15 март</strong> (една седмица по-късно). Последен шанс да тествате форма, нерви и удари преди Национално първенство.
            </p>
            <p style={{ marginBottom: '1.2rem' }}>
              🔥 Силни мачове • 🔥 Още по-силни нерви • 🔥 Класическото „как изпуснах ТАЗИ топка?!“
            </p>
            <div className="actions" style={{ marginBottom: '0.4rem' }}>
              <Link
                href={DOUBLE_YELLOW_OPEN_URL}
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register on RankedIn
              </Link>
            </div>
          </div>
        )}

        {showArchivedDoubleYellowOpen && (
          <section>
            <h2>Old Events</h2>
            <p>
              Past tournaments, workshops, and special club events.
            </p>

            <div className="event-card">
              <Link
                href={DOUBLE_YELLOW_OPEN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Double Yellow Open tournament page"
              >
                <OptimizedImage
                  src={DOUBLE_YELLOW_OPEN_POSTER}
                  alt="Double Yellow Open tournament on 14-15 March 2026"
                  width={1536}
                  height={1024}
                  className="event-card__image"
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  priority={false}
                />
              </Link>

              <h3>
                Double Yellow Open — 14–15 March 2026
              </h3>
              <p>
                Event finished. Thanks to everyone who joined the second stop of the Bulgarian Squash Tour.
              </p>
              <div className="actions">
                <Link
                  href={DOUBLE_YELLOW_OPEN_URL}
                  className="btn btn--secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Tournament Page
                </Link>
              </div>
            </div>
          </section>
        )}

        {showDoubleYellowOpen && (
          <hr
            aria-hidden="true"
            style={{
              border: 0,
              borderTop: '3px solid var(--accent)',
              margin: '0 0 2rem 0',
            }}
          />
        )}

        <div className="event-card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>БЪЛГАРСКИ СКУОШ ТУР 2026</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            12 турнира. 1 ранглиста. Само най-добрите 8 резултата броят.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Организиран под егидата на Българска Федерация Скуош. Всички турнири се провеждат в RankedIn – без хартия, без драми, само squash 💥
          </p>
          
          <h3 style={{ color: 'var(--accent)', marginTop: '2rem', marginBottom: '1rem' }}>📅 Календар 2026</h3>
          <ul style={{ lineHeight: '1.8' }}>
            <li>1️⃣ <strong>07–08 февруари</strong> – Fireball</li>
            <li>2️⃣ <strong>14–15 март</strong> – Double Yellow Squash Club</li>
            <li>3️⃣ <strong>21–22 март</strong> – Sofia Squash Center</li>
            <li>4️⃣ <strong>18–19 април</strong> – Double Yellow Squash Club</li>
            <li>5️⃣ <strong>02–03 май</strong> – Fireball</li>
            <li>6️⃣ <strong>30–31 май</strong> – Sofia Squash Center</li>
            <li>7️⃣ <strong>20–21 юни</strong> – Double Yellow Squash Club</li>
            <li style={{ fontStyle: 'italic', opacity: 0.7 }}>— лятна пауза за възстановяване на дробовете —</li>
            <li>8️⃣ <strong>19–20 септември</strong> – Sofia Squash Center</li>
            <li>9️⃣ <strong>03–04 октомври</strong> – Fireball</li>
            <li>1️⃣0️⃣ <strong>24–25 октомври</strong> – Double Yellow Squash Club</li>
            <li>1️⃣1️⃣ <strong>14–15 ноември</strong> – Fireball</li>
            <li>1️⃣2️⃣ <strong>05–06 декември</strong> – Sofia Squash Center</li>
          </ul>

          <h3 style={{ color: 'var(--accent)', marginTop: '2rem', marginBottom: '1rem' }}>🏆 Как работи турът?</h3>
          <ul>
            <li>12 месечни турнира</li>
            <li>В ранглистата влизат най-добрите 8 резултата</li>
            <li>Минимум 2 гарантирани мача за всеки</li>
            <li>Формат: 2 от 3 гейма (финали: 3 от 5), PAR 11</li>
            <li>Загубилият реферира (fair play + cardio 😉)</li>
          </ul>

          <h3 style={{ color: 'var(--accent)', marginTop: '2rem', marginBottom: '1rem' }}>💶 Такси</h3>
          <ul>
            <li>Регистрирани състезатели: 25 EUR</li>
            <li>Нерегистрирани: 35 EUR</li>
            <li>Годишна състезателска регистрация: 25 EUR</li>
            <li>Годишна клубна регистрация към БФСкуош: 180 EUR</li>
          </ul>

          <p style={{ marginTop: '2rem', fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent)' }}>
            See you on court! 🟡⚫
          </p>
        </div>
      </section>
    </main>
  );
}
