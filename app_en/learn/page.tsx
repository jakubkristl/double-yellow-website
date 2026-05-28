import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { articles } from "@/lib/articles-en";
import LearnEngagement from "@/components/LearnEngagement";

export const metadata: Metadata = createPageMetadata({
  path: "/learn",
  title: "Squash Tips for Beginners — Double Yellow",
  description:
    "Weekly squash tips, tricks, and guides written for beginners in plain language. Learn the grip, the swing, the court, and why the dots on the ball matter.",
});

export default function LearnPage() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="learn-page container">
      <h1 className="page-title">Learn Squash</h1>
      <p className="learn-intro">
        Short, honest guides for beginners — published weekly. No jargon, no
        gatekeeping, occasional jokes.
      </p>

      <div className="article-grid">
        {sorted.map((article) => (
          <Link
            key={article.slug}
            href={`/learn/${article.slug}`}
            className="article-card"
          >
            <div className="article-card-body">
              <div className="article-meta">
                <time dateTime={article.date} className="article-date">
                  {new Date(article.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span className="article-read">{article.readingMinutes} min read</span>
              </div>
              <h2 className="article-title">{article.title}</h2>
              <p className="article-excerpt">{article.excerpt}</p>
              <div className="article-tags">
                {article.tags.map((tag) => (
                  <span key={tag} className="article-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <LearnEngagement locale="en" />

      <section className="learn-cta card">
        <p className="beginner-kicker">Ready to put it into practice?</p>
        <h2 className="h2">First lesson free. Trainer and equipment included.</h2>
        <p className="lead">Everything you just read makes a lot more sense when someone is on court showing you in real time.</p>
        <div className="cta-buttons">
          <a
            href="https://sport.bookinggood.net/bg/embed/facility/44/72"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Book Free First Lesson
          </a>
          <a
            href="https://wa.me/359896754014?text=Hi%20Double%20Yellow!%20I%20read%20your%20beginner%20tips%20and%20want%20to%20try%20squash."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Ask on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
