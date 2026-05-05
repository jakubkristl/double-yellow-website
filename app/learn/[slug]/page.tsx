import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { articles, getArticleBySlug } from "@/lib/articles";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return createPageMetadata({
    path: `/learn/${article.slug}`,
    title: `${article.title} — Double Yellow`,
    description: article.excerpt,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const others = articles
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <main className="article-page container">
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <Link href="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link href="/learn" className="breadcrumb-link">Learn Squash</Link>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">{article.title}</span>
      </nav>

      <article className="article-body">
        <header className="article-header">
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
          <h1 className="article-page-title">{article.title}</h1>
          <p className="article-page-excerpt">{article.excerpt}</p>
          <div className="article-tags">
            {article.tags.map((tag) => (
              <span key={tag} className="article-tag">{tag}</span>
            ))}
          </div>
        </header>

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <aside className="article-cta card">
          <p className="beginner-kicker">Put it into practice</p>
          <h2 className="h2">First lesson free. Trainer and equipment included.</h2>
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
        </aside>
      </article>

      {others.length > 0 && (
        <section className="article-more">
          <h2 className="article-more-title">More beginner guides</h2>
          <div className="article-grid article-grid--compact">
            {others.map((a) => (
              <Link key={a.slug} href={`/learn/${a.slug}`} className="article-card">
                <div className="article-card-body">
                  <div className="article-meta">
                    <time dateTime={a.date} className="article-date">
                      {new Date(a.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <span className="article-read">{a.readingMinutes} min read</span>
                  </div>
                  <h3 className="article-title">{a.title}</h3>
                  <p className="article-excerpt">{a.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
