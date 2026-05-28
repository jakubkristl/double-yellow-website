"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase";
import type { Database } from "@/lib/supabase";

type Comment = Database["public"]["Tables"]["article_comments"]["Row"];

type LearnEngagementProps = {
  articleSlug?: string;
  articleTitle?: string;
  locale?: "bg" | "en";
};

const copy = {
  bg: {
    sectionLabel: "Панел за взаимодействие в Learn",
    hubLabel: "секцията Научи скуош",
    articleLabel: (title: string) => `статията "${title}"`,
    likeActive: "❤ Харесано",
    likeIdle: "♡ Харесай",
    likeOne: "харесване",
    likeMany: "харесвания",
    commentOne: "коментар",
    commentMany: "коментара",
    kicker: "Нека Learn секцията бъде разговор",
    heading: "Реагирай, коментирай, поискай съвет или предложи следваща тема.",
    commentTitle: "Остави коментар",
    commentText:
      "Сподели реакция, въпрос или типична грешка на начинаещ. Коментарите се показват след кратка проверка.",
    commentSubmitted:
      "Благодарим! Коментарът ти е приет и ще се появи след одобрение.",
    commentNamePlaceholder: "Име или псевдоним",
    commentMessagePlaceholder:
      "Какво ти беше полезно, какво те обърка и какво да обясним по-добре?",
    commentButton: "Изпрати коментар",
    commentsEmpty: "Все още няма одобрени коментари. Бъди първият.",
    adviceTitle: "Поискай съвет",
    adviceText:
      "Отваря WhatsApp с готов въпрос, за да ти отговорим на корта или с гласово съобщение.",
    advicePlaceholder:
      "Пример: Все удрям рамката на бекхенд, когато замахвам по-бързо. Какво да променя?",
    adviceButton: "Пиши в WhatsApp",
    topicTitle: "Предложи следваща тема",
    topicText:
      "Кажи ни какво да покрие следващото ръководство за начинаещи. Темата отива и в WhatsApp, за да не се изгуби.",
    topicSubmitted: "Записахме го. Добавено е към списъка.",
    topicPlaceholder: "Пример: Как да посрещам сервис без паника",
    topicButton: "Предложи тема",
    anonymous: "Анонимен",
    whatsappAdvice: (contextLabel: string, message: string) =>
      `Здравейте Double Yellow! Имам нужда от съвет за ${contextLabel}. Въпросът ми е: ${message}`,
    whatsappTopic: (message: string) =>
      `Здравейте Double Yellow! Искам нова тема в Learn секцията: ${message}`,
    dateLocale: "bg-BG",
  },
  en: {
    sectionLabel: "Learn interaction panel",
    hubLabel: "the Learn Squash section",
    articleLabel: (title: string) => `the article "${title}"`,
    likeActive: "❤ Liked",
    likeIdle: "♡ Like this",
    likeOne: "like",
    likeMany: "likes",
    commentOne: "comment",
    commentMany: "comments",
    kicker: "Make the Learn section a conversation",
    heading: "React, comment, ask for advice, or suggest the next topic.",
    commentTitle: "Leave a comment",
    commentText:
      "Drop a reaction, question, or beginner mistake. Comments appear after a quick moderation check.",
    commentSubmitted:
      "Thanks! Your comment is in the queue - it'll appear once approved.",
    commentNamePlaceholder: "Name or nickname",
    commentMessagePlaceholder:
      "What helped, what confused you, what should we explain better?",
    commentButton: "Post comment",
    commentsEmpty: "No approved comments yet. Be the first.",
    adviceTitle: "Ask for advice",
    adviceText:
      "Opens WhatsApp with your question pre-filled so we can answer on-court or with a voice message.",
    advicePlaceholder:
      "Example: I keep framing the backhand when I swing faster. What should I change?",
    adviceButton: "Ask on WhatsApp",
    topicTitle: "Request the next topic",
    topicText:
      "Tell us what the next beginner guide should cover. Topic also goes to WhatsApp so nothing gets lost.",
    topicSubmitted: "Got it! Added to the list.",
    topicPlaceholder: "Example: How to return serve without panicking",
    topicButton: "Suggest topic",
    anonymous: "Anonymous",
    whatsappAdvice: (contextLabel: string, message: string) =>
      `Hi Double Yellow! I need advice about ${contextLabel}. My question: ${message}`,
    whatsappTopic: (message: string) =>
      `Hi Double Yellow! I want a new Learn topic about: ${message}`,
    dateLocale: "en-GB",
  },
} as const;

const FINGERPRINT_KEY = "dy:fp";
const WHATSAPP_BASE = "https://wa.me/359896754014?text=";

function openWhatsApp(message: string) {
  window.open(
    `${WHATSAPP_BASE}${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
}

function getOrCreateFingerprint(): string {
  try {
    let fp = window.localStorage.getItem(FINGERPRINT_KEY);
    if (!fp) {
      fp =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
      window.localStorage.setItem(FINGERPRINT_KEY, fp);
    }
    return fp;
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  }
}

export default function LearnEngagement({
  articleSlug,
  articleTitle,
  locale = "bg",
}: LearnEngagementProps) {
  const text = copy[locale];
  const slug = articleSlug ?? "hub";
  const contextLabel = articleTitle
    ? text.articleLabel(articleTitle)
    : text.hubLabel;

  const [isReady, setIsReady] = useState(false);
  const [fingerprint, setFingerprint] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);

  const [commentName, setCommentName] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const [adviceMessage, setAdviceMessage] = useState("");

  const [topicMessage, setTopicMessage] = useState("");
  const [topicSubmitted, setTopicSubmitted] = useState(false);

  useEffect(() => {
    const db = createBrowserClient();
    const fp = getOrCreateFingerprint();
    setFingerprint(fp);

    async function load() {
      const [{ count }, { data: userLike }, { data: commentData }] =
        await Promise.all([
          db
            .from("article_likes")
            .select("*", { count: "exact", head: true })
            .eq("article_slug", slug),
          db
            .from("article_likes")
            .select("id")
            .eq("article_slug", slug)
            .eq("fingerprint", fp)
            .maybeSingle(),
          db
            .from("article_comments")
            .select("*")
            .eq("article_slug", slug)
            .eq("status", "approved")
            .order("created_at", { ascending: false }),
        ]);

      setLikeCount(count ?? 0);
      setLiked(!!userLike);
      setComments(commentData ?? []);
      setIsReady(true);
    }

    load().catch(() => setIsReady(true));
  }, [slug]);

  async function handleLike() {
    if (!isReady || !fingerprint) return;
    const db = createBrowserClient();
    const next = !liked;
    setLiked(next);
    setLikeCount((c) => Math.max(0, next ? c + 1 : c - 1));

    if (next) {
      await db.from("article_likes").upsert({ article_slug: slug, fingerprint });
    } else {
      await db
        .from("article_likes")
        .delete()
        .eq("article_slug", slug)
        .eq("fingerprint", fingerprint);
    }
  }

  async function handleCommentSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = commentMessage.trim();
    const name = commentName.trim() || text.anonymous;
    if (!message) return;

    const db = createBrowserClient();
    await db
      .from("article_comments")
      .insert({ article_slug: slug, name, message });

    setCommentName("");
    setCommentMessage("");
    setCommentSubmitted(true);
  }

  function handleAdviceRequest() {
    const trimmed = adviceMessage.trim();
    if (!trimmed) return;
    openWhatsApp(text.whatsappAdvice(contextLabel, trimmed));
    setAdviceMessage("");
  }

  async function handleTopicRequest() {
    const trimmed = topicMessage.trim();
    if (!trimmed) return;

    const db = createBrowserClient();
    await db.from("topic_requests").insert({ message: trimmed });
    openWhatsApp(text.whatsappTopic(trimmed));
    setTopicMessage("");
    setTopicSubmitted(true);
  }

  return (
    <section className="learn-engagement card" aria-label={text.sectionLabel}>
      <div className="learn-engagement__header">
        <div>
          <p className="beginner-kicker">{text.kicker}</p>
          <h2 className="h2">{text.heading}</h2>
        </div>
        <div className="learn-engagement__meta">
          <button
            type="button"
            className={`learn-like-btn${liked ? " is-active" : ""}`}
            onClick={handleLike}
            disabled={!isReady}
          >
            {liked ? text.likeActive : text.likeIdle}
          </button>
          {isReady && likeCount > 0 && (
            <span className="learn-engagement__stat">
              {likeCount} {likeCount === 1 ? text.likeOne : text.likeMany}
            </span>
          )}
          <span className="learn-engagement__stat">
            {comments.length} {comments.length === 1 ? text.commentOne : text.commentMany}
          </span>
        </div>
      </div>

      <div className="learn-engagement__grid">
        {/* Comments */}
        <div className="learn-panel">
          <h3 className="learn-panel__title">{text.commentTitle}</h3>
          <p className="learn-panel__text">{text.commentText}</p>

          {commentSubmitted ? (
            <p className="learn-panel__success">{text.commentSubmitted}</p>
          ) : (
            <form onSubmit={handleCommentSubmit} className="learn-comment-form">
              <input
                type="text"
                className="learn-input"
                placeholder={text.commentNamePlaceholder}
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                maxLength={50}
              />
              <textarea
                className="learn-input learn-textarea"
                placeholder={text.commentMessagePlaceholder}
                value={commentMessage}
                onChange={(e) => setCommentMessage(e.target.value)}
                rows={4}
                maxLength={400}
              />
              <div className="learn-panel__actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!commentMessage.trim()}
                >
                  {text.commentButton}
                </button>
              </div>
            </form>
          )}

          <div className="learn-comments">
            {comments.length === 0 ? (
              <p className="learn-comments__empty">{text.commentsEmpty}</p>
            ) : (
              comments.slice(0, 6).map((comment) => (
                <article key={comment.id} className="learn-comment">
                  <div className="learn-comment__top">
                    <strong>{comment.name}</strong>
                    <time dateTime={comment.created_at}>
                      {new Date(comment.created_at).toLocaleDateString(text.dateLocale, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                  <p>{comment.message}</p>
                </article>
              ))
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="learn-panel-group">
          <section className="learn-panel">
            <h3 className="learn-panel__title">{text.adviceTitle}</h3>
            <p className="learn-panel__text">{text.adviceText}</p>
            <textarea
              className="learn-input learn-textarea"
              placeholder={text.advicePlaceholder}
              value={adviceMessage}
              onChange={(e) => setAdviceMessage(e.target.value)}
              rows={4}
              maxLength={500}
            />
            <div className="learn-panel__actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAdviceRequest}
                disabled={!adviceMessage.trim()}
              >
                {text.adviceButton}
              </button>
            </div>
          </section>

          <section className="learn-panel">
            <h3 className="learn-panel__title">{text.topicTitle}</h3>
            <p className="learn-panel__text">{text.topicText}</p>
            {topicSubmitted ? (
              <p className="learn-panel__success">{text.topicSubmitted}</p>
            ) : (
              <>
                <input
                  type="text"
                  className="learn-input"
                  placeholder={text.topicPlaceholder}
                  value={topicMessage}
                  onChange={(e) => setTopicMessage(e.target.value)}
                  maxLength={120}
                />
                <div className="learn-panel__actions">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleTopicRequest}
                    disabled={!topicMessage.trim()}
                  >
                    {text.topicButton}
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
