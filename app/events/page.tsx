import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Double Yellow Squash",
  description:
    "Follow upcoming community sessions, guest coaching visits, and squash workshops at Double Yellow Squash Club in Sofia.",
  openGraph: {
    title: "Events | Double Yellow Squash",
    description:
      "Follow upcoming community sessions, guest coaching visits, and squash workshops at Double Yellow Squash Club in Sofia.",
    url: "https://doubleyellow.bg/events",
    images: [
      {
        url: "https://doubleyellow.bg/hero/02.jpg",
        alt: "Squash player at Double Yellow club",
      },
    ],
  },
};

export const revalidate = 3600;

export default function EventsPage() {
  return (
    <main>
      <section className="container container--narrow">
        <h1 className="page-title">Events</h1>
        <p className="subtitle">One-off events, workshops & guest visits.</p>

        <div className="event-card event-card--mid-gap">
          <h2 className="event-heading">Guest Coaching Visits</h2>
          <p>
            We regularly host experienced coaches for focused clinics and tactical sessions.
            Follow this page and our social channels for upcoming dates.
          </p>
        </div>

        <div className="event-card event-card--mid-gap">
          <h2 className="event-heading">Workshops & Community Sessions</h2>
          <p>
            The club runs one-off workshops and themed community sessions for all levels,
            from first-time players to competitive regulars.
          </p>
        </div>

        <div className="event-card event-card--large-gap">
          <h2 className="event-heading">How To Join</h2>
          <p className="event-text-gap">
            To join upcoming events, check available sessions in Activities or contact us directly.
          </p>
          <div className="actions">
            <Link href="/activities" className="btn btn--secondary">Browse Activities</Link>
            <Link href="/contact" className="btn btn--primary">Contact The Club</Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .event-card--mid-gap {
          margin-bottom: 1.5rem;
        }

        .event-card--large-gap {
          margin-bottom: 2rem;
        }

        .event-heading {
          color: var(--accent);
          margin-bottom: 0.8rem;
        }

        .event-text-gap {
          margin-bottom: 1rem;
        }
      `}</style>
    </main>
  );
}
