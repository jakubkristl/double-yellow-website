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
    schedule: "Fridays 18:00–20:00",
    benefit:
      "No partner needed. Show up, get matched, and play. Sofia's most social squash night — all levels welcome, just bring yourself.",
    bookingUrl: "https://sport.bookinggood.net/bg/embed/facility/44/72?day=5&time=18:00",
    image: "/activities/comeandplay.jpg",
    alt: "Social Squash Friday night",
    cta: "Join This Friday",
    featured: true,
    badge: "Every Friday",
  },
  {
    title: "Mini Squash (Kids)",
    schedule: "Saturdays & Sundays 10:00",
    benefit:
      "Small groups, fun drills, and coach-led development. Great first step for kids, equipment included.",
    bookingUrl: "https://sport.bookinggood.net/bg/embed/facility/44/72?day=6&time=10:00",
    image: "/activities/minisquash.jpg",
    alt: "Mini Squash for kids",
    cta: "Book Kids Session",
  },
];

const otherActivities: Activity[] = [
  {
    title: "Squash for Beginners",
    schedule: "Check with reception for current availability",
    benefit:
      "Guided sessions for absolute beginners. First lesson free, trainer and equipment included.",
    bookingUrl: "https://sport.bookinggood.net/bg/embed/facility/44/72",
    image: "/activities/beginners.jpg",
    alt: "Squash for Beginners",
    cta: "Book Beginner Session",
  },
  {
    title: "Time for Ladies",
    schedule: "Check with reception for current availability",
    benefit:
      "Women-only session with a friendly pace and clear coaching support to build confidence quickly.",
    bookingUrl: "https://sport.bookinggood.net/bg/embed/facility/44/72",
    image: "/activities/timeforladies.jpg",
    alt: "Time for Ladies",
    cta: "Book Ladies Session",
  },
  {
    title: "Magnificent 7",
    schedule: "Check with reception for current availability",
    benefit:
      "Play 7 matches in 2 hours, guaranteed. High-energy round-robin format with quick rotations.",
    bookingUrl: "https://sport.bookinggood.net/bg/embed/facility/44/72",
    image: "/activities/magnificent7.jpg",
    alt: "Magnificent 7",
    cta: "Reserve Magnificent 7",
  },
  {
    title: "Glass Challenge",
    schedule: "Ongoing",
    benefit:
      "Beat the Glass challenge, log attempts, and climb the monthly leaderboard with the club community.",
    image: "/activities/glasschallenge.jpg",
    alt: "Glass Challenge",
    cta: "Visit Reception To Join",
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
        aria-label={`Open image for ${activity.title}`}
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
        No partner needed. No experience needed. Just show up.
      </p>

      {/* Viber community block */}
      <section className="viber-community-block">
        <div className="viber-community-inner">
          <div className="viber-community-text">
            <p className="beginner-kicker">Viber Community</p>
            <h2 className="viber-community-title">Аматъорски, ама сквош</h2>
            <p className="viber-community-desc">
              Find a game partner any day of the week. Ask questions, stay updated on Social Squash nights, and connect with the club community — all in one place.
            </p>
          </div>
          <div className="viber-community-actions">
            <a
              href={VIBER_URL}
              className="btn btn-viber"
            >
              Join on Viber
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Message on WhatsApp
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
        <p className="beginner-kicker">New to squash?</p>
        <h2 className="h2">First lesson free. Trainer and equipment included.</h2>
        <ul className="beginner-list">
          <li>No experience needed</li>
          <li>Trainer guides every step</li>
          <li>Racket and shoes provided</li>
        </ul>
        <div className="cta-buttons">
          <a href="https://sport.bookinggood.net/bg/embed/facility/44/72" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Claim Free First Lesson
          </a>
          <a href="/contact" className="btn btn-secondary">
            Ask A Trainer
          </a>
        </div>
      </section>

      {/* Other programs */}
      <section className="other-programs">
        <h2 className="other-programs-title">Other Programs</h2>
        <p className="other-programs-note">
          The following programs run occasionally. Contact reception to check current availability.
        </p>
        <div className="activities-grid activities-grid--compact">
          {otherActivities.map((activity) => (
            <ActivityCard key={activity.title} activity={activity} onZoom={setZoomedImg} />
          ))}
        </div>
      </section>

      <IntroLeadForm locale="en" />

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
            aria-label="Close"
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
