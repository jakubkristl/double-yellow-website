"use client";

import { useEffect, useMemo, useState } from "react";

type LearnComment = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

type StoredEngagement = {
  liked: boolean;
  comments: LearnComment[];
};

type LearnEngagementProps = {
  articleSlug?: string;
  articleTitle?: string;
};

const WHATSAPP_BASE_URL = "https://wa.me/359896754014?text=";

function parseStoredEngagement(value: string | null): StoredEngagement {
  if (!value) {
    return { liked: false, comments: [] };
  }

  try {
    const parsed = JSON.parse(value) as Partial<StoredEngagement>;
    return {
      liked: parsed.liked === true,
      comments: Array.isArray(parsed.comments) ? parsed.comments : [],
    };
  } catch {
    return { liked: false, comments: [] };
  }
}

export default function LearnEngagement({ articleSlug, articleTitle }: LearnEngagementProps) {
  const storageKey = useMemo(
    () => `double-yellow:learn:${articleSlug ?? "hub"}`,
    [articleSlug],
  );
  const contextLabel = articleTitle ? `the article \"${articleTitle}\"` : "the Learn Squash section";

  const [isReady, setIsReady] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<LearnComment[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [adviceMessage, setAdviceMessage] = useState("");
  const [topicMessage, setTopicMessage] = useState("");

  useEffect(() => {
    const stored = parseStoredEngagement(window.localStorage.getItem(storageKey));
    setLiked(stored.liked);
    setComments(stored.comments);
    setIsReady(true);
  }, [storageKey]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const payload: StoredEngagement = { liked, comments };
    window.localStorage.setItem(storageKey, JSON.stringify(payload));
  }, [comments, isReady, liked, storageKey]);

  function openWhatsApp(message: string) {
    const href = `${WHATSAPP_BASE_URL}${encodeURIComponent(message)}`;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  function handleCommentSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextMessage = commentMessage.trim();
    const nextName = commentName.trim() || "Squash curious human";

    if (!nextMessage) {
      return;
    }

    setComments((current) => [
      {
        id: `${Date.now()}`,
        name: nextName,
        message: nextMessage,
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
    setCommentName("");
    setCommentMessage("");
  }

  function handleAdviceRequest() {
    const trimmed = adviceMessage.trim();
    if (!trimmed) {
      return;
    }

    openWhatsApp(
      `Hi Double Yellow! I need advice about ${contextLabel}. My question: ${trimmed}`,
    );
    setAdviceMessage("");
  }

  function handleTopicRequest() {
    const trimmed = topicMessage.trim();
    if (!trimmed) {
      return;
    }

    openWhatsApp(
      `Hi Double Yellow! I want a new Learn topic about: ${trimmed}`,
    );
    setTopicMessage("");
  }

  return (
    <section className="learn-engagement card" aria-label="Learn interaction panel">
      <div className="learn-engagement__header">
        <div>
          <p className="beginner-kicker">Make the Learn section a conversation</p>
          <h2 className="h2">React, comment, ask for advice, or suggest the next topic.</h2>
        </div>
        <div className="learn-engagement__meta">
          <button
            type="button"
            className={`learn-like-btn ${liked ? "is-active" : ""}`}
            onClick={() => setLiked((current) => !current)}
          >
            {liked ? "Liked" : "Like this"}
          </button>
          <span className="learn-engagement__stat">{comments.length} comments here</span>
        </div>
      </div>

      <div className="learn-engagement__grid">
        <form className="learn-panel learn-comment-form" onSubmit={handleCommentSubmit}>
          <h3 className="learn-panel__title">Leave a comment</h3>
          <p className="learn-panel__text">Drop a quick reaction, question, or your own beginner mistake so the section feels alive.</p>
          <input
            type="text"
            className="learn-input"
            placeholder="Name or nickname"
            value={commentName}
            onChange={(event) => setCommentName(event.target.value)}
            maxLength={50}
          />
          <textarea
            className="learn-input learn-textarea"
            placeholder="What helped, what confused you, what should we explain better?"
            value={commentMessage}
            onChange={(event) => setCommentMessage(event.target.value)}
            rows={4}
            maxLength={400}
          />
          <div className="learn-panel__actions">
            <button type="submit" className="btn btn-primary">Post comment</button>
          </div>
          <div className="learn-comments">
            {comments.length === 0 ? (
              <p className="learn-comments__empty">No comments yet. Be the first useful squash nerd.</p>
            ) : (
              comments.slice(0, 4).map((comment) => (
                <article key={comment.id} className="learn-comment">
                  <div className="learn-comment__top">
                    <strong>{comment.name}</strong>
                    <time dateTime={comment.createdAt}>
                      {new Date(comment.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </time>
                  </div>
                  <p>{comment.message}</p>
                </article>
              ))
            )}
          </div>
        </form>

        <div className="learn-panel-group">
          <section className="learn-panel">
            <h3 className="learn-panel__title">Ask for advice</h3>
            <p className="learn-panel__text">Send a real question and we open WhatsApp with the article context already filled in.</p>
            <textarea
              className="learn-input learn-textarea"
              placeholder="Example: I keep framing the backhand when I swing faster. What should I change?"
              value={adviceMessage}
              onChange={(event) => setAdviceMessage(event.target.value)}
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
            <p className="learn-panel__text">Tell us what should be turned into the next beginner guide, breakdown, or myth-busting piece.</p>
            <input
              type="text"
              className="learn-input"
              placeholder="Example: How to return serve without panicking"
              value={topicMessage}
              onChange={(event) => setTopicMessage(event.target.value)}
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
          </section>
        </div>
      </div>
    </section>
  );
}