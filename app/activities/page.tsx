"use client";

import Image from "next/image";
import OptimizedImage from "@/components/OptimizedImage";
import { useState } from "react";
import IntroLeadForm from "@/components/IntroLeadForm";

const VIBER_URL = "viber://chat?number=%2B359896754014";
const WHATSAPP_URL = "https://wa.me/359896754014";

type Activity = {
  title: string;
  schedule: string;
  benefit: string;
  bookingUrl?: string;
  image: string;
  alt: string;
  cta: string;
  featured?: boolean;
  badge?: string;
};

const featuredActivities: Activity[] = [
  {
    title: "Social Squash",
    schedule: "Петък 18:00-20:00",
    benefit:
      "Не ти трябва партньор. Идваш, намираме ти мач и играеш. Най-социалната скуош вечер в София - всички нива са добре дошли.",
    bookingUrl: "https://sport.bookinggood.net/bg/embed/facility/44/72?day=5&time=18:00",
    image: "/activities/comeandplay.jpg",
    alt: "Social Squash в петък вечер",
    cta: "Включи се този петък",
    featured: true,
    badge: "Всеки петък",
  },
  {
    title: "Mini Squash (деца)",
    schedule: "Събота и неделя 10:00",
    benefit:
      "Малки групи, забавни упражнения и развитие с треньор. Отлична първа стъпка за деца, с включена екипировка.",
    bookingUrl: "https://sport.bookinggood.net/bg/embed/facility/44/72?day=6&time=10:00",
    image: "/activities/minisquash.jpg",
    alt: "Mini Squash за деца",
    cta: "Запази детска тренировка",
  },
];

const otherActivities: Activity[] = [
  {
    title: "Скуош за начинаещи",
    schedule: "Провери на рецепция за актуални часове",
    benefit:
      "Водени сесии за напълно начинаещи. Първият урок е безплатен, с включени треньор и екипировка.",
    bookingUrl: "https://sport.bookinggood.net/bg/embed/facility/44/72",
    image: "/activities/beginners.jpg",
    alt: "Скуош за начинаещи",
    cta: "Запази сесия за начинаещи",
  },
  {
    title: "Time for Ladies",
    schedule: "Провери на рецепция за актуални часове",
    benefit:
      "Сесия само за жени с приятелско темпо и ясна подкрепа от треньор за бързо изграждане на увереност.",
    bookingUrl: "https://sport.bookinggood.net/bg/embed/facility/44/72",
    image: "/activities/timeforladies.jpg",
    alt: "Time for Ladies",
    cta: "Запази дамска сесия",
  },
  {
    title: "Magnificent 7",
    schedule: "Провери на рецепция за актуални часове",
    benefit:
      "Изиграй 7 мача за 2 часа - гарантирано. Високоенергиен round-robin формат с бързи ротации.",
    bookingUrl: "https://sport.bookinggood.net/bg/embed/facility/44/72",
    image: "/activities/magnificent7.jpg",
    alt: "Magnificent 7",
    cta: "Запази Magnificent 7",
  },
  {
    title: "Glass Challenge",
    schedule: "Постоянно",
    benefit:
      "Премини Glass Challenge, записвай опитите си и се изкачи в месечната класация на клуба.",
    image: "/activities/glasschallenge.jpg",
    alt: "Glass Challenge",
    cta: "Запиши се на рецепция",
  },
];

function ActivityCard({
  activity,
  onZoom,
}: {
  activity: Activity;
  onZoom: (img: { src: string; alt: string }) => void;
}) {
  return (
    <article className={`activity-card${activity.featured ? " activity-card--featured" : ""}`}>
      {activity.badge && <span className="activity-badge">{activity.badge}</span>}
      <button
        type="button"
        className="activity-media-btn"
        onClick={() => onZoom({ src: activity.image, alt: activity.alt })}
        aria-label={`Отвори изображение за ${activity.title}`}
      >
        <OptimizedImage
          src={activity.image}
          alt={activity.alt}
          width={640}
          height={420}
          className="activity-media"
        />
      </button>
      <div className="activity-content">
        <h2 className="activity-title">{activity.title}</h2>
        <p className="activity-schedule">{activity.schedule}</p>
        <p className="activity-benefit">{activity.benefit}</p>
        {activity.bookingUrl ? (
          <a
            href={activity.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            {activity.cta}
          </a>
        ) : (
          <p className="activity-static-cta">{activity.cta}</p>
        )}
      </div>
    </article>
  );
}

export default function ActivitiesPage() {
  const [zoomedImg, setZoomedImg] = useState<{ src: string; alt: string } | null>(null);

  return (
    <main className="activities-page">
      <h1 className="page-title">Activities</h1>
      <p className="activities-subtitle">
        Не ти трябва партньор. Не ти трябва опит. Просто ела.
      </p>

      {/* Viber community block */}
      <section className="viber-community-block">
        <div className="viber-community-inner">
          <div className="viber-community-text">
            <p className="beginner-kicker">Viber общност</p>
            <h2 className="viber-community-title">Аматъорски, ама сквош</h2>
            <p className="viber-community-desc">
              Намери си партньор за игра всеки ден от седмицата. Задавай въпроси, следи Social Squash вечерите и бъди част от клубната общност на едно място.
            </p>
          </div>
          <div className="viber-community-actions">
            <a
              href={VIBER_URL}
              className="btn btn-viber"
            >
              Присъедини се във Viber
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Пиши в WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Featured activities */}
      <div className="activities-grid">
        {featuredActivities.map((activity) => (
          <ActivityCard key={activity.title} activity={activity} onZoom={setZoomedImg} />
        ))}
      </div>

      {/* Beginner offer */}
      <section className="activities-offer card">
        <p className="beginner-kicker">Нов в скуоша?</p>
        <h2 className="h2">Първи урок безплатно. Треньор и екипировка са включени.</h2>
        <ul className="beginner-list">
          <li>Не е нужен опит</li>
          <li>Треньор те води във всяка стъпка</li>
          <li>Ракета и обувки са осигурени</li>
        </ul>
        <div className="cta-buttons">
          <a href="https://sport.bookinggood.net/bg/embed/facility/44/72" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Вземи безплатен първи урок
          </a>
          <a href="/contact" className="btn btn-secondary">
            Попитай треньор
          </a>
        </div>
      </section>

      {/* Other programs */}
      <section className="other-programs">
        <h2 className="other-programs-title">Други програми</h2>
        <p className="other-programs-note">
          Следните програми се провеждат периодично. Свържи се с рецепция за актуални часове.
        </p>
        <div className="activities-grid activities-grid--compact">
          {otherActivities.map((activity) => (
            <ActivityCard key={activity.title} activity={activity} onZoom={setZoomedImg} />
          ))}
        </div>
      </section>

      <IntroLeadForm />

      {zoomedImg && (
        <div
          onClick={() => setZoomedImg(null)}
          className="zoom-overlay"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoomedImg(null);
            }}
            className="zoom-close"
            aria-label="Затвори"
          >
            ✕
          </button>
          <div onClick={(e) => e.stopPropagation()} className="zoom-content">
            <Image
              src={zoomedImg.src}
              alt={zoomedImg.alt}
              width={1200}
              height={900}
              className="zoom-image"
            />
          </div>
        </div>
      )}
    </main>
  );
}
