// app/events/page.tsx
import React from "react";

type EventBox = {
  title: string;
  when: string;
  desc: string;
  pills?: string[];
  ctaText?: string;
  ctaHref?: string;
  thumb?: string;           // path under /public/events
  featured?: boolean;
  whenStyle?: React.CSSProperties;
};

const EVENTS: EventBox[] = [
  // ===== FEATURED ONE-OFF (TOP) =====
  {
    title: "Tomáš Tóth Visit + Winner Shot Tournament",
    when: "Thu 4 Dec – Sun 7 Dec",
    desc:
      "Guest sessions with Slovak #1 Tomáš Tóth (Thu & Fri). Winner Shot tournament runs Sat & Sun with three draws: Men, Women, and Men 35+.",
    pills: ["Guest Pro", "Tournament"],
    ctaText: "Details & Sign-up",
    ctaHref: "https://www.facebook.com/WINNERSHOTSQUASH",
    thumb: "/events/tomas.jpg",
    featured: true,
    whenStyle: { color: "#fff" }, // dates in white
  },

  // ===== REGULAR WEEKLY PROGRAMS (GRID BELOW) =====
  {
    title: "Time for Ladies",
    when: "Wednesdays • 18:00",
    desc:
      "Women-only session: friendly pace, great vibes, quick progress. Bring a friend or come solo — we’ll pair you up.",
    pills: ["Women Only", "Coached"],
    thumb: "/events/ladies.jpg",
    whenStyle: { color: "#fff" },
  },
  {
    title: "Mini Squash",
    when: "Saturday & Sunday • 10:00",
    desc:
      "Kids class with lots of games and fundamentals. Equipment included. Small groups — up to 6 kids per coach.",
    pills: ["Kids", "Equipment Included"],
    thumb: "/events/mini-squash.jpg",
    whenStyle: { color: "#fff" },
  },
  {
    title: "Magnificent 7",
    when: "Thursdays • 18:00–20:30",
    desc:
      "Round-robin for seven players — tight matches, quick rotations, scoreboard thrills. Ranking and registration available on RankedIn.",
    pills: ["Ranking", "Match Play"],
    ctaText: "Register on RankedIn",
    ctaHref: "https://rankedin.com/",
    thumb: "/events/magnificent7.jpg",
    whenStyle: { color: "#fff" },
  },
  {
    title: "Come-and-Play",
    when: "Tuesdays • 18:00 | Saturdays • 11:00–13:00",
    desc:
      "Open community session — rotate courts, meet partners, find your level. The most social way to play.",
    pills: ["Open Session", "All Levels"],
    thumb: "/events/come-and-play.jpg",
    whenStyle: { color: "#fff" },
  },
  {
    title: "Squash for Beginners",
    when: "Mondays • 18:00 | Fridays • 18:00",
    desc:
      "Absolute-beginner friendly class. Movement basics, swing shape, and simple drills so you can start rallying fast.",
    pills: ["Beginner", "Coached"],
    thumb: "/events/beginners.jpg",
    whenStyle: { color: "#fff" },
  },
  {
    title: "Challenges — Glass Challenge",
    when: "Ongoing",
    desc:
      "Beat the Glass! Ongoing challenge on our back-wall courts. Log attempts at the desk; monthly leaderboard and bragging rights.",
    pills: ["Challenge", "Leaderboard"],
    thumb: "/events/glass-challenge.jpg",
    whenStyle: { color: "#fff" },
  },
];

export default function EventsPage() {
  const featured = EVENTS.filter((e) => e.featured);
  const regular = EVENTS.filter((e) => !e.featured);

  return (
    <section className="container">
      <div className="membership-header">
        <h1 className="membership-title">Events</h1>
        <div className="membership-sub">Weekly programs & special occasions</div>
      </div>

      {/* Featured one-offs */}
      {featured.length > 0 && (
        <div className="featured-grid">
          {featured.map((e) => (
            <article key={e.title} className="featured-card">
              {e.thumb && (
                <div className="featured-thumb">
                  <img src={e.thumb} alt={e.title} />
                </div>
              )}
              <div className="featured-content">
                <h3 className="event-title">{e.title}</h3>
                <div className="event-when" style={e.whenStyle}>
                  {e.when}
                </div>
                <p className="event-desc">{e.desc}</p>
                {e.ctaHref && e.ctaText && (
                  <a
                    href={e.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-link"
                  >
                    {e.ctaText} →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Regular programs grid */}
      <div className="price-grid">
        {regular.map((e) => (
          <article key={e.title} className="price-card">
            {e.thumb && (
              <div className="event-thumb">
                <img src={e.thumb} alt={e.title} />
              </div>
            )}
            <h3 className="event-title">{e.title}</h3>
            <div className="event-when" style={e.whenStyle}>
              {e.when}
            </div>
            {e.pills && (
              <div className="pill-row">
                {e.pills.map((p) => (
                  <span key={p} className="pill">
                    {p}
                  </span>
                ))}
              </div>
            )}
            <p className="event-desc">{e.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
