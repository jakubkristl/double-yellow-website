import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/beginner-squash-sofia",
  title: "Beginner Squash Sofia | Start With Confidence",
  description:
    "New to squash in Sofia? Start with beginner-friendly sessions at Double Yellow. No experience needed, equipment included, and coach guidance every step.",
  image: "/activities/beginners.jpg",
});

export default function BeginnerSquashSofiaPage() {
  return (
    <section className="container">
      <header className="page-hero">
        <h1 className="page-title">Beginner Squash in Sofia</h1>
        <p className="hero-subtitle">
          No experience. No stress. First lesson free with trainer and equipment included.
        </p>
      </header>

      <article className="card beginner-priority">
        <p className="beginner-kicker">Start Here</p>
        <h2 className="beginner-title">You can play your first game this week</h2>
        <ul className="beginner-list">
          <li>First lesson is free</li>
          <li>Small-group beginner format</li>
          <li>Trainer support for movement and hitting basics</li>
          <li>Equipment included on site</li>
          <li>Friendly players at your level</li>
        </ul>
        <div className="cta-buttons">
          <a href="/activities" className="btn btn-primary">Join Beginner Session</a>
          <a href="/booking" className="btn btn-secondary">Book A Court</a>
        </div>
      </article>

      <div className="conversion-grid conversion-grid-spaced">
        <article className="card">
          <h2 className="h2">What happens in your first session</h2>
          <p className="lead">1. Warm-up and movement basics</p>
          <p className="lead">2. Simple hitting patterns</p>
          <p className="lead">3. Guided games to build confidence</p>
        </article>

        <article className="card availability-card">
          <h2 className="h2">Spots fill quickly</h2>
          <p className="lead">Evening beginner slots are limited every week.</p>
          <div className="urgency-strip">
            <span>Popular times: 18:00-21:00</span>
            <span>Reserve early to secure a place</span>
          </div>
        </article>
      </div>
    </section>
  );
}
