import Image from "next/image";
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
        url: "https://doubleyellow.bg/events/tomas.jpg",
        alt: "Special coaching visit at Double Yellow",
      },
    ],
  },
};

export default function EventsPage() {
  return (
    <main>
      <section className="container container--narrow">
        <h1 className="title-xl">Events</h1>
        <p className="subtitle">One-off events, workshops & guest visits.</p>

        <article className="event-card">
          <div className="event-card__image">
            <Image
              src="/events/tomas.jpg"
              alt="Tomáš Tóth coaching at Double Yellow Squash Club"
              width={1600}
              height={900}
              priority
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "12px 12px 0 0",
              }}
            />
          </div>

          <div className="event-card__body">
            <h2 className="title-lg">Tomáš Tóth — Coaching Visit</h2>
            <p className="event-card__meta">Thu–Sun • 4–7 December</p>
            <p className="event-card__text">
              Slovak #1 Tomáš Tóth is visiting Double Yellow for a limited
              coaching block and a special Saturday tournament. Book individual
              or group sessions and join the club challenge.
            </p>

            <ul className="tags">
              <li>Guest Coach</li>
              <li>1-to-1 &amp; Group</li>
              <li>Limited Slots</li>
            </ul>

            <div className="actions">
              <Link href="/booking" className="btn btn--primary">
                Book a session
              </Link>
              <Link href="/contact" className="btn btn--ghost">
                Ask a question
              </Link>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
