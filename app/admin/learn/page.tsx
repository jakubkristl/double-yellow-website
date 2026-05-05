import type { Metadata } from "next";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase-admin";
import {
  loginAction,
  logoutAction,
  approveCommentAction,
  rejectCommentAction,
  updateTopicStatusAction,
} from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Learn Admin — Double Yellow",
  robots: { index: false, follow: false },
};

export default async function AdminLearnPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const c = await cookies();
  const isAuthenticated =
    c.get("dy_admin_session")?.value === process.env.ADMIN_SECRET;

  if (!isAuthenticated) {
    return (
      <main className="container admin-login-page">
        <h1 className="page-title">Admin Login</h1>
        {error && <p className="admin-error">Wrong password. Try again.</p>}
        <form action={loginAction} className="learn-panel admin-login-form">
          <label htmlFor="admin-pw" className="learn-panel__title">
            Password
          </label>
          <input
            id="admin-pw"
            type="password"
            name="password"
            className="learn-input"
            placeholder="Admin password"
            autoFocus
            required
          />
          <div>
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </div>
        </form>
      </main>
    );
  }

  const db = createAdminClient();
  const [commentsRes, topicsRes, likesRes] = await Promise.all([
    db
      .from("article_comments")
      .select("*")
      .neq("status", "rejected")
      .order("created_at", { ascending: false }),
    db
      .from("topic_requests")
      .select("*")
      .order("created_at", { ascending: false }),
    db.from("article_likes").select("article_slug"),
  ]);

  const comments = commentsRes.data ?? [];
  const topicRequests = topicsRes.data ?? [];

  const likesByArticle: Record<string, number> = {};
  (likesRes.data ?? []).forEach(({ article_slug }) => {
    likesByArticle[article_slug] =
      (likesByArticle[article_slug] ?? 0) + 1;
  });

  const pending = comments.filter((c) => c.status === "pending");
  const approved = comments.filter((c) => c.status === "approved");
  const newTopics = topicRequests.filter((t) => t.status === "new").length;

  return (
    <main className="container admin-page">
      <div className="admin-header">
        <h1 className="page-title">Learn Admin</h1>
        <form action={logoutAction}>
          <button type="submit" className="btn btn-secondary">
            Log out
          </button>
        </form>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        <div
          className={`learn-panel admin-stat${pending.length > 0 ? " admin-stat--highlight" : ""}`}
        >
          <p className={`admin-stat__number${pending.length > 0 ? " admin-stat__number--highlight" : ""}`}>
            {pending.length}
          </p>
          <p className="admin-stat__label">Pending comments</p>
        </div>
        <div className="learn-panel admin-stat">
          <p className="admin-stat__number">{approved.length}</p>
          <p className="admin-stat__label">Approved comments</p>
        </div>
        <div
          className={`learn-panel admin-stat${newTopics > 0 ? " admin-stat--highlight" : ""}`}
        >
          <p className={`admin-stat__number${newTopics > 0 ? " admin-stat__number--highlight" : ""}`}>
            {newTopics}
          </p>
          <p className="admin-stat__label">New topic requests</p>
        </div>
        {Object.entries(likesByArticle).map(([slug, count]) => (
          <div key={slug} className="learn-panel admin-stat">
            <p className="admin-stat__number">{count} ❤</p>
            <p className="admin-stat__slug">{slug}</p>
          </div>
        ))}
      </div>

      {/* Pending comments */}
      <h2 className="h2 admin-section-title">
        Pending{" "}
        {pending.length > 0 && <span>({pending.length})</span>}
      </h2>
      {pending.length === 0 ? (
        <p className="muted admin-list">All clear.</p>
      ) : (
        <div className="admin-list">
          {pending.map((comment) => (
            <div
              key={comment.id}
              className="learn-panel admin-comment admin-comment--pending"
            >
              <div className="admin-comment__top">
                <div>
                  <strong>{comment.name}</strong>
                  <span className="admin-comment__meta">
                    on <em>{comment.article_slug}</em> ·{" "}
                    {new Date(comment.created_at).toLocaleString("en-GB")}
                  </span>
                </div>
                <div className="admin-comment__actions">
                  <form action={approveCommentAction}>
                    <input type="hidden" name="id" value={comment.id} />
                    <button
                      type="submit"
                      className="btn btn-primary admin-btn-sm"
                    >
                      Approve
                    </button>
                  </form>
                  <form action={rejectCommentAction}>
                    <input type="hidden" name="id" value={comment.id} />
                    <button
                      type="submit"
                      className="btn btn-secondary admin-btn-sm"
                    >
                      Reject
                    </button>
                  </form>
                </div>
              </div>
              <p className="admin-comment__body">{comment.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Approved comments */}
      {approved.length > 0 && (
        <>
          <h2 className="h2 admin-section-title">
            Approved ({approved.length})
          </h2>
          <div className="admin-list">
            {approved.map((comment) => (
              <div key={comment.id} className="learn-panel admin-comment">
                <div className="admin-comment__top">
                  <div>
                    <strong>{comment.name}</strong>
                    <span className="admin-comment__meta">
                      on <em>{comment.article_slug}</em>
                    </span>
                  </div>
                  <form action={rejectCommentAction}>
                    <input type="hidden" name="id" value={comment.id} />
                    <button
                      type="submit"
                      className="btn btn-secondary admin-btn-sm"
                    >
                      Remove
                    </button>
                  </form>
                </div>
                <p className="admin-comment__body">{comment.message}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Topic requests */}
      <h2 className="h2 admin-section-title">
        Topic requests ({topicRequests.length})
      </h2>
      {topicRequests.length === 0 ? (
        <p className="muted">No requests yet.</p>
      ) : (
        <div className="admin-list">
          {topicRequests.map((topic) => (
            <div key={topic.id} className="learn-panel admin-topic">
              <div className="admin-topic__text">
                <p className="admin-topic__message">{topic.message}</p>
                <span className="admin-topic__date">
                  {new Date(topic.created_at).toLocaleDateString("en-GB")}
                </span>
              </div>
              <form action={updateTopicStatusAction} className="admin-topic__form">
                <input type="hidden" name="id" value={topic.id} />
                <label htmlFor={`status-${topic.id}`} className="sr-only">
                  Status for: {topic.message}
                </label>
                <select
                  id={`status-${topic.id}`}
                  name="status"
                  defaultValue={topic.status}
                  className="learn-input"
                >
                  <option value="new">New</option>
                  <option value="noted">Noted</option>
                  <option value="done">Done ✓</option>
                </select>
                <button
                  type="submit"
                  className="btn btn-primary admin-btn-sm"
                >
                  Save
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
