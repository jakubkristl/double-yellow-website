import Image from "next/image";
import OptimizedImage from "@/components/OptimizedImage";
import Link from "next/link";
import type { Metadata } from "next";

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
        url: "https://doubleyellow.bg/hero/01b.jpeg",
        alt: "Double Yellow Squash Club",
      },
    ],
  },
};

export default function EventsPage() {
  return (
    <main>
      <section className="container container--narrow">
        <h1 className="page-title">Events</h1>
        <p className="subtitle">One-off events, workshops & guest visits.</p>

        <div className="event-card" style={{ marginBottom: '2rem' }}>
          <OptimizedImage
            src="/hero/bulgarian-squash-tour-2026.png"
            alt="Bulgarian Squash Tour 2026"
            width={1920}
            height={1080}
            className="event-card__image"
            style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '1.5rem' }}
          />
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
            <li>2️⃣ <strong>07–08 март</strong> – Double Yellow Squash Club</li>
            <li>3️⃣ <strong>21–22 март</strong> – Sofia Squash Center</li>
            <li>4️⃣ <strong>18–19 април</strong> – Double Yellow Squash Club</li>
            <li>5️⃣ <strong>02–03 май</strong> – Fireball</li>
            <li>6️⃣ <strong>30–31 май</strong> – Sofia Squash Center</li>
            <li>7️⃣ <strong>20–21 юни</strong> – Double Yellow Squash Club</li>
            <li style={{ fontStyle: 'italic', opacity: 0.7 }}>— лятна пауза за възстановяване на дробовете —</li>
            <li>8️⃣ <strong>19–20 септември</strong> – Sofia Squash Center</li>
            <li>9️⃣ <strong>03–04 октомври</strong> – Fireball</li>
            <li>🔟 <strong>24–25 октомври</strong> – Double Yellow Squash Club</li>
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
