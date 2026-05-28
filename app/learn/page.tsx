import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { articles } from "@/lib/articles";
import LearnEngagement from "@/components/LearnEngagement";

export const metadata: Metadata = createPageMetadata({
  path: "/learn",
  title: "Съвети за начинаещи в скуоша - Double Yellow",
  description:
    "Седмични съвети, трикове и ръководства за начинаещи в скуоша, написани разбираемо. Научи хвата, замаха, ориентацията на корта и защо точките по топката имат значение.",
});

export default function LearnPage() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="learn-page container">
      <h1 className="page-title">Научи скуош</h1>
      <p className="learn-intro">
        Кратки и честни ръководства за начинаещи - публикувани всяка седмица.
        Без сложен жаргон и без излишно усложняване.
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
                  {new Date(article.date).toLocaleDateString("bg-BG", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <span className="article-read">{article.readingMinutes} мин четене</span>
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

      <LearnEngagement locale="bg" />

      <section className="learn-cta card">
        <p className="beginner-kicker">Готов ли си да го приложиш на корта?</p>
        <h2 className="h2">Първи урок безплатно. Треньор и екипировка са включени.</h2>
        <p className="lead">Всичко, което прочете, става много по-ясно, когато някой ти го покаже на корта в реално време.</p>
        <div className="cta-buttons">
          <a
            href="https://sport.bookinggood.net/bg/embed/facility/44/72"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Запази безплатен първи урок
          </a>
          <a
            href="https://wa.me/359896754014?text=Здравейте%20Double%20Yellow!%20Прочетох%20съветите%20за%20начинаещи%20и%20искам%20да%20пробвам%20скуош."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            Пиши в WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
