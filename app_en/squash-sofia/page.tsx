import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/squash-sofia",
  title: "Squash Sofia | Double Yellow Squash Club",
  description:
    "Play squash in Sofia on renovated WSF-spec courts. Fast online booking, beginner-friendly sessions, and a welcoming community at Double Yellow.",
  image: "/hero/02.jpg",
});

export default function SquashSofiaPage() {
  return (
    <section className="container">
      <header className="page-hero">
        <h1 className="page-title">Squash in Sofia That Feels Easy to Start</h1>
        <p className="hero-subtitle">
          First lesson free, trainer included, equipment included. New courts and a friendly community so you can start today.
        </p>
      </header>

      <div className="split">
        <article className="card">
          <h2 className="h2">Why players choose us</h2>
          <ul className="beginner-list">
            <li>Renovated WSF-spec courts in central Sofia</li>
            <li>Open daily with evening slots and weekend sessions</li>
            <li>Beginner groups, social sessions, and coached options</li>
            <li>Rackets and balls available on site</li>
          </ul>
          <div className="cta-buttons">
            <a href="/booking" className="btn btn-primary">Book A Court</a>
            <a href="/activities" className="btn btn-secondary">Find A Session</a>
          </div>
        </article>

        <article className="card">
          <h2 className="h2">Quick answers for first-timers</h2>
          <p className="lead"><strong>Do I need my own equipment?</strong> No, we provide what you need.</p>
          <p className="lead"><strong>Can I come alone?</strong> Yes. Join community sessions and we match partners.</p>
          <p className="lead"><strong>Is it hard to start?</strong> Not with a beginner format and coach guidance.</p>
          <div className="urgency-strip">
            <span>Peak hours are often full</span>
            <span>Next available: today 19:00</span>
          </div>
        </article>
      </div>
    </section>
  );
}
