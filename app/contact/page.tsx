// app/contact/page.tsx
import React from "react";
import type { Metadata } from "next";
import PhoneLink from "@/components/PhoneLink";
import IntroLeadForm from "@/components/IntroLeadForm";

export const metadata: Metadata = {
  title: "Контакт с Double Yellow | Телефон, имейл и локация",
  description:
    "Свържи се с Double Yellow Squash Club. Телефон: +359 896 754 014, имейл: jakub@doubleyellowsquash.com. Намираме се в НСА, София.",
  openGraph: {
    title: "Контакт с Double Yellow | Телефон, имейл и локация",
    description:
      "Свържи се с Double Yellow Squash Club. Телефон: +359 896 754 014, имейл: jakub@doubleyellowsquash.com. Намираме се в НСА, София.",
    url: "https://www.doubleyellowsquash.com/contact",
    images: [
      {
        url: "https://www.doubleyellowsquash.com/og/double-yellow-social-1200x630.png",
        alt: "Double Yellow Squash Club social card",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <section className="container contact-section">
      <div className="membership-header">
        <h1 className="page-title">Контакт</h1>
        <div className="membership-sub">
          Първи урок безплатно. Треньор и екипировка са включени. Запази корт, задай въпрос или просто ни пиши.
        </div>
      </div>

      <IntroLeadForm locale="bg" />

      {/* Quick contacts */}
      <div className="contact-grid">
        <PhoneLink className="contact-card" href="tel:+359896754014">
          <div className="contact-title">Телефон</div>
          <div className="contact-data">+359 896 754 014</div>
          <div className="contact-note">Обаждане / Viber / WhatsApp</div>
        </PhoneLink>

        <a className="contact-card" href="mailto:jakub@doubleyellowsquash.com">
          <div className="contact-title">Имейл</div>
          <div className="contact-data">jakub@doubleyellowsquash.com</div>
          <div className="contact-note">Резервации • Събития • Партньорства</div>
        </a>

        <a
          className="contact-card"
          href="https://www.doubleyellowsquash.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="contact-title">Уебсайт</div>
          <div className="contact-data">doubleyellowsquash.com</div>
          <div className="contact-note">Новини • Абонаменти • График</div>
        </a>

        <a
          className="contact-card"
          href="https://maps.app.goo.gl/UDAAByWq8sRQgraM9"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="contact-title">Локация</div>
          <div className="contact-data">Отвори в Maps</div>
          <div className="contact-note">Кампус НСА, София</div>
        </a>

        <a
          className="contact-card"
          href="https://www.facebook.com/profile.php?id=61576296615086"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="contact-title">Facebook</div>
          <div className="contact-data">@DoubleYellowSquashClub</div>
          <div className="contact-note">Новини, снимки и събития</div>
        </a>

        <a
          className="contact-card"
          href="https://www.instagram.com/doubleyellowsquashclub/#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="contact-title">Instagram</div>
          <div className="contact-data">@doubleyellowsquashclub</div>
          <div className="contact-note">Сторита, reels и ежедневни моменти</div>
        </a>

        <a
          className="contact-card"
          href="https://www.tiktok.com/@doubleyellowsquash"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="contact-title">TikTok</div>
          <div className="contact-data">@doubleyellowsquash</div>
          <div className="contact-note">Клипове, разигравания и кадри зад сцената</div>
        </a>
      </div>

      {/* Location & directions */}
      <div className="contact-cols">
        <div className="contact-left">
          <h3 className="contact-heading">Къде да ни откриеш</h3>
          <p className="contact-address">
            <strong>Double Yellow Squash Club</strong><br />
            Национална спортна академия (НСА) - Многофункционална зала<br />
            ул. Акад. Стефан Младенов 21, 1700 София, България
          </p>

          <div className="directions">
            <div className="dir-block">
              <div className="dir-title">Работно време</div>
              <ul>
                <li><strong>Всеки ден:</strong> 07:00 - 22:00</li>
              </ul>
            </div>

            <div className="dir-block">
              <div className="dir-title">Упътване</div>
              <ul>
                <li>
                  Double Yellow Squash Club се намира в кампуса на Национална спортна академия (НСА)
                  в квартал Студентски град.
                </li>
                <li>
                  Намираме се в <em>Многофункционалната зала</em>, а скуош кортовете са на <strong>етаж -1</strong>.
                </li>
              </ul>
            </div>

            <div className="dir-block">
              <div className="dir-title">Градски транспорт</div>
              <ul>
                <li>
                  <strong>Автобус:</strong> 94, 102, 280 и 294.
                </li>
                <li>
                  <strong>Метро:</strong> метрото не стига директно до кампуса на НСА.
                  Трябва да се прехвърлиш на спирка Г. М. Димитров (линия M1 или M4) и да вземеш автобус.
                </li>
                <li>
                  <strong>От Г. М. Димитров:</strong> излез от метростанцията и се качи на автобус 280 или 294.
                </li>
                <li>
                  <strong>Пристигане:</strong> слез на крайната спирка Национална спортна академия.
                </li>
              </ul>
            </div>

            <div className="dir-block">
              <div className="dir-title">Такси / Ride-hailing</div>
              <ul>
                <li>
                  <strong>Приложения:</strong> Yellow! и TaxiMe са надеждни опции с ясни цени.
                </li>
                <li>
                  <strong>Дестинация:</strong> задай "Double Yellow Squash Club" или
                  "NSA Studentski Grad".
                </li>
                <li>
                  <strong>Ориентировъчна цена от центъра:</strong> 8.00 EUR до 12.00 EUR.
                </li>
              </ul>
            </div>

            <div className="dir-block">
              <div className="dir-title">С автомобил</div>
              <ul>
                <li>
                  <strong>Навигация:</strong> въведи "Double Yellow Squash Club" в Google Maps или Waze.
                </li>
                <li>
                  <strong>Вход:</strong> достъпът до кампуса е от ул. Акад. Стефан Младенов.
                </li>
                <li>
                  <strong>Паркинг:</strong> наличен директно пред спортния комплекс.
                </li>
              </ul>
            </div>

            <div className="dir-block">
              <div className="dir-title">Полезни съвети</div>
              <ul>
                <li>
                  <strong>Плащане:</strong> градският транспорт поддържа плащане с безконтактна карта
                  на сините валидатори в автобусите или на входовете на метрото (1.60 лв. / ~0.82 EUR на пътуване).
                </li>
                <li>
                  <strong>Охрана на входа:</strong> ако те попитат на входа на кампуса, кажи че отиваш
                  към скуош кортовете.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <div className="map-wrap">
            <iframe
              title="Double Yellow Squash Club - НСА"
              width="100%"
              height="420"
              className="map-frame"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=42.64691445104994,23.34826493526649&z=17&output=embed"
            />
          </div>
          <div className="map-note">
            Намираме се в кампуса на Национална спортна академия. Скуош кортовете са на ниво -1 в Многофункционалната зала.
          </div>
        </div>
      </div>
    </section>
  );
}
