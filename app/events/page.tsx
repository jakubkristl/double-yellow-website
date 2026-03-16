import Link from "next/link";
import type { Metadata } from "next";
import OptimizedImage from "@/components/OptimizedImage";

const BNT_ARTICLE_URL =
  "https://bnt.bg/news/chuzhdencite-slovakat-yakob-kristal-koito-razviva-skuosh-v-balgariya-v410712-347134news.html";

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
          <h2 className="event-heading">Featured On BNT</h2>
          <p className="event-text-gap">
            BNT featured Jakub Kristl and the growth of squash in Bulgaria in the
            "Chuzhdentsite" segment. Watch the story and read the article.
          </p>
          <Link
            href={BNT_ARTICLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open BNT feature about Jakub Kristl"
            className="event-media-link"
          >
            <OptimizedImage
              src="/events/bnt-jakob-kristal.png"
              alt="BNT feature about Jakub Kristl developing squash in Bulgaria"
              width={840}
              height={454}
              className="event-media"
              priority
            />
          </Link>
          <div className="actions">
            <Link
              href={BNT_ARTICLE_URL}
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open BNT Article
            </Link>
          </div>
        </div>

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

        <div className="event-card event-card--mid-gap">
          <h2 className="event-heading">Bulgarian Squash Tour 2026</h2>
          <p className="event-text-gap">
            12 tournaments, one ranking, best 8 results count. This section stays published
            throughout the 2026 season.
          </p>
          <p className="event-text-gap">
            Organized under the Bulgarian Squash Federation and managed digitally in RankedIn.
          </p>

          <h3 className="event-subheading">Calendar 2026</h3>
          <ul className="event-list event-list--spaced">
            <li>07-08 February - Fireball</li>
            <li>14-15 March - Double Yellow Squash Club</li>
            <li>21-22 March - Sofia Squash Center</li>
            <li>18-19 April - Double Yellow Squash Club</li>
            <li>02-03 May - Fireball</li>
            <li>30-31 May - Sofia Squash Center</li>
            <li>20-21 June - Double Yellow Squash Club</li>
            <li>19-20 September - Sofia Squash Center</li>
            <li>03-04 October - Fireball</li>
            <li>24-25 October - Double Yellow Squash Club</li>
            <li>14-15 November - Fireball</li>
            <li>05-06 December - Sofia Squash Center</li>
          </ul>

          <h3 className="event-subheading">How The Tour Works</h3>
          <ul className="event-list">
            <li>12 monthly tournaments</li>
            <li>Best 8 results enter the ranking</li>
            <li>Minimum 2 guaranteed matches per player</li>
            <li>Format: best of 3 games (finals best of 5), PAR 11</li>
            <li>Loser referees the next match</li>
          </ul>

          <h3 className="event-subheading">Fees</h3>
          <ul className="event-list">
            <li>Registered athletes: 25 EUR</li>
            <li>Non-registered players: 35 EUR</li>
            <li>Annual athlete registration: 25 EUR</li>
            <li>Annual club registration to federation: 180 EUR</li>
          </ul>
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

        .event-subheading {
          color: var(--accent);
          margin: 1.5rem 0 0.8rem;
        }

        .event-list {
          margin: 0;
          padding-left: 1.2rem;
        }

        .event-list--spaced {
          line-height: 1.8;
        }

        .event-media-link {
          display: block;
          margin-bottom: 1rem;
        }

        .event-media {
          width: 100%;
          height: auto;
          border-radius: 8px;
        }
      `}</style>
    </main>
  );
}
