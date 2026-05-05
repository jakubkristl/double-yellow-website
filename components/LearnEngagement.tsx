"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase";
import type { Database } from "@/lib/supabase";

type Comment = Database["public"]["Tables"]["article_comments"]["Row"];

type LearnEngagementProps = {
  articleSlug?: string;
  articleTitle?: string;
};

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
}: LearnEngagementProps) {
  const slug = articleSlug ?? "hub";
  const contextLabel = articleTitle
    ? `the article "${articleTitle}"`
    : "the Learn Squash section";

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
    const name = commentName.trim() || "Anonymous";
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
    openWhatsApp(
      `Hi Double Yellow! I need advice about ${contextLabel}. My question: ${trimmed}`,
    );
    setAdviceMessage("");
  }

  async function handleTopicRequest() {
    const trimmed = topicMessage.trim();
    if (!trimmed) return;

    const db = createBrowserClient();
    await db.from("topic_requests").insert({ message: trimmed });
    openWhatsApp(
      `Hi Double Yellow! I want a new Learn topic about: ${trimmed}`,
    );
    setTopicMessage("");
    setTopicSubmitted(true);
  }

  return (
    <section className="learn-engagement card" aria-label="Learn interaction panel">
      <div className="learn-engagement__header">
        <div>
          <p className="beginner-kicker">Make the Learn section a conversation</p>
          <h2 className="h2">
            React, comment, ask for advice, or suggest the next topic.
          </h2>
        </div>
        <div className="learn-engagement__meta">
          <button
            type="button"
            className={`learn-like-btn${liked ? " is-active" : ""}`}
            onClick={handleLike}
            disabled={!isReady}
          >
            {liked ? "❤ Liked" : "♡ Like this"}
          </button>
          {isReady && likeCount > 0 && (
            <span className="learn-engagement__stat">
              {likeCount} {likeCount === 1 ? "like" : "likes"}
            </span>
          )}
          <span className="learn-engagement__stat">
            {comments.length} comment{comments.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="learn-engagement__grid">
        {/* Comments */}
        <div className="learn-panel">
          <h3 className="learn-panel__title">Leave a comment</h3>
          <p className="learn-panel__text">
            Drop a reaction, question, or beginner mistake. Comments appear
            after a quick moderation check.
          </p>

          {commentSubmitted ? (
            <p className="learn-panel__success">
              Thanks! Your comment is in the queue — it&apos;ll appear once
              approved.
            </p>
          ) : (
            <form onSubmit={handleCommentSubmit} className="learn-comment-form">
              <input
                type="text"
                className="learn-input"
                placeholder="Name or nickname"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                maxLength={50}
              />
              <textarea
                className="learn-input learn-textarea"
                placeholder="What helped, what confused you, what should we explain better?"
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
                  Post comment
                </button>
              </div>
            </form>
          )}

          <div className="learn-comments">
            {comments.length === 0 ? (
              <p className="learn-comments__empty">
                No approved comments yet. Be the first.
              </p>
            ) : (
              comments.slice(0, 6).map((comment) => (
                <article key={comment.id} className="learn-comment">
                  <div className="learn-comment__top">
                    <strong>{comment.name}</strong>
                    <time dateTime={comment.created_at}>
                      {new Date(comment.created_at).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "short", year: "numeric" },
                      )}
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
            <h3 className="learn-panel__title">Ask for advice</h3>
            <p className="learn-panel__text">
              Opens WhatsApp with your question pre-filled so we can answer
              on-court or with a voice message.
            </p>
            <textarea
              className="learn-input learn-textarea"
              placeholder="Example: I keep framing the backhand when I swing faster. What should I change?"
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
                Ask on WhatsApp
              </button>
            </div>
          </section>

          <section className="learn-panel">
            <h3 className="learn-panel__title">Request the next topic</h3>
            <p className="learn-panel__text">
              Tell us what the next beginner guide should cover. Topic also
              goes to WhatsApp so nothing gets lost.
            </p>
            {topicSubmitted ? (
              <p className="learn-panel__success">Got it! Added to the list.</p>
            ) : (
              <>
                <input
                  type="text"
                  className="learn-input"
                  placeholder="Example: How to return serve without panicking"
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
                    Suggest topic
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
