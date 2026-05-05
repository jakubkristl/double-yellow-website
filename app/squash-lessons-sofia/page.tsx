import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/squash-lessons-sofia",
  title: "Squash Lessons Sofia | Coaching At Double Yellow",
  description:
    "Book squash lessons in Sofia for beginners and improving players. Learn with coach-led sessions, structured progress, and flexible bookings at Double Yellow.",
  image: "/hero/03.jpg",
});

export default function SquashLessonsSofiaPage() {
  return (
    <section className="container">
      <header className="page-hero">
        <h1 className="page-title">Squash Lessons in Sofia</h1>
        <p className="hero-subtitle">
          First lesson free, trainer included, and equipment included. Build technique and confidence with structured coaching.
        </p>
      </header>

      <div className="split">
        <article className="card">
          <h2 className="h2">Coaching options</h2>
          <ul className="beginner-list">
            <li>Beginner sessions for first-time players</li>
            <li>Group lessons for rally and tactics development</li>
            <li>Event and community formats for match experience</li>
          </ul>
          <div className="cta-buttons">
            <a href="/activities" className="btn btn-primary">View Coaching Sessions</a>
            <a href="/contact" className="btn btn-secondary">Ask About Coaching</a>
          </div>
        </article>

        <article className="card">
          <h2 className="h2">Why lessons convert to real progress</h2>
          <p className="lead">Clear drills and goals each session.</p>
          <p className="lead">Faster improvement with feedback on movement and shot choices.</p>
          <p className="lead">Direct path from first lesson to social and competitive play.</p>
          <a href="/booking" className="btn btn-primary cta-top-gap">
            Reserve A Time
          </a>
        </article>
      </div>
    </section>
  );
}
