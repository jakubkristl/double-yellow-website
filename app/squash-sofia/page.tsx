import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/squash-sofia",
  title: "Скуош София | Double Yellow Squash Club",
  description:
    "Играй скуош в София на реновирани кортове по WSF стандарт. Бърза онлайн резервация, сесии за начинаещи и приятелска общност в Double Yellow.",
  image: "/hero/02.jpg",
});

export default function SquashSofiaPage() {
  return (
    <section className="container">
      <header className="page-hero">
        <h1 className="page-title">Скуош в София, лесен за старт</h1>
        <p className="hero-subtitle">
          Първи урок безплатно, с треньор и екипировка. Нови кортове и общност,
          с която да започнеш още днес.
        </p>
      </header>

      <div className="split">
        <article className="card">
          <h2 className="h2">Защо играчите избират нас</h2>
          <ul className="beginner-list">
            <li>Реновирани кортове по WSF стандарт в София</li>
            <li>Отворени всеки ден, включително вечерни и уикенд часове</li>
            <li>Групи за начинаещи, социални сесии и тренировки</li>
            <li>Ракети и топки на място</li>
          </ul>
          <div className="cta-buttons">
            <a href="/booking" className="btn btn-primary">
              Резервирай корт
            </a>
            <a href="/activities" className="btn btn-secondary">
              Виж сесии
            </a>
          </div>
        </article>

        <article className="card">
          <h2 className="h2">Бързи отговори за начинаещи</h2>
          <p className="lead">
            <strong>Трябва ли ми собствена екипировка?</strong> Не — имаме на
            място.
          </p>
          <p className="lead">
            <strong>Мога ли да дойда сам?</strong> Да. Включи се в общностни
            сесии и намираме партньор.
          </p>
          <p className="lead">
            <strong>Трудно ли е да започна?</strong> Не с формат за начинаещи и
            треньор.
          </p>
          <div className="urgency-strip">
            <span>Пикови часове 18:00–21:00</span>
            <span>Резервирай предварително</span>
          </div>
          <div className="cta-buttons" style={{ marginTop: 16 }}>
            <a href="/booking" className="btn btn-primary">
              Виж свободните часове
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
