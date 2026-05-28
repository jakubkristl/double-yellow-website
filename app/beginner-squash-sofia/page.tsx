import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/beginner-squash-sofia",
  title: "Скуош за начинаещи в София | Започни уверено",
  description:
    "Нов в скуоша в София? Започни с приятелски сесии за начинаещи в Double Yellow. Не е нужен опит, екипировката е включена, а треньор те води във всяка стъпка.",
  image: "/activities/beginners.jpg",
});

export default function BeginnerSquashSofiaPage() {
  return (
    <section className="container">
      <header className="page-hero">
        <h1 className="page-title">Скуош за начинаещи в София</h1>
        <p className="hero-subtitle">
          Без опит. Без стрес. Първи урок безплатно с включени треньор и екипировка.
        </p>
      </header>

      <article className="card beginner-priority">
        <p className="beginner-kicker">Започни оттук</p>
        <h2 className="beginner-title">Можеш да играеш първия си мач още тази седмица</h2>
        <ul className="beginner-list">
          <li>Първият урок е безплатен</li>
          <li>Формат за начинаещи в малка група</li>
          <li>Подкрепа от треньор за движение и основни удари</li>
          <li>Екипировка на място</li>
          <li>Приветливи играчи на твоето ниво</li>
        </ul>
        <div className="cta-buttons">
          <a href="/activities" className="btn btn-primary">Включи се в сесия за начинаещи</a>
          <a href="/booking" className="btn btn-secondary">Резервирай корт</a>
        </div>
      </article>

      <div className="conversion-grid conversion-grid-spaced">
        <article className="card">
          <h2 className="h2">Какво ще се случи в първата сесия</h2>
          <p className="lead">1. Загрявка и основи на движението</p>
          <p className="lead">2. Лесни модели на удари</p>
          <p className="lead">3. Водени игри за изграждане на увереност</p>
        </article>

        <article className="card availability-card">
          <h2 className="h2">Местата се запълват бързо</h2>
          <p className="lead">Вечерните часове за начинаещи са ограничени всяка седмица.</p>
          <div className="urgency-strip">
            <span>Популярни часове: 18:00-21:00</span>
            <span>Резервирай по-рано, за да си гарантираш място</span>
          </div>
        </article>
      </div>
    </section>
  );
}
