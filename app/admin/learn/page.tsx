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
      <main className="container" style={{ maxWidth: 480, paddingTop: 60 }}>
        <h1 className="page-title">Admin Login</h1>
        {error && (
          <p style={{ color: "#ff6b6b", margin: "16px 0 0" }}>
            Wrong password. Try again.
          </p>
        )}
        <form
          action={loginAction}
          className="learn-panel"
          style={{ marginTop: 28, display: "grid", gap: 16 }}
        >
          <label
            htmlFor="admin-pw"
            className="learn-panel__title"
            style={{ marginBottom: 0 }}
          >
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

  return (
    <main className="container" style={{ paddingTop: 24, paddingBottom: 64 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <h1 className="page-title" style={{ margin: 0 }}>
          Learn Admin
        </h1>
        <form action={logoutAction}>
          <button type="submit" className="btn btn-secondary">
            Log out
          </button>
        </form>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
        {[
          { label: "Pending comments", value: pending.length, highlight: pending.length > 0 },
          { label: "Approved comments", value: approved.length, highlight: false },
          {
            label: "New topic requests",
            value: topicRequests.filter((t) => t.status === "new").length,
            highlight: topicRequests.filter((t) => t.status === "new").length > 0,
          },
        ].map(({ label, value, highlight }) => (
          <div
            key={label}
            className="learn-panel"
            style={{
              flex: "1 1 150px",
              borderColor: highlight ? "var(--accent)" : undefined,
            }}
          >
            <div
              className="learn-panel__title"
              style={{
                fontSize: "2rem",
                color: highlight ? "var(--accent)" : "var(--text)",
              }}
            >
              {value}
            </div>
            <p className="learn-panel__text" style={{ margin: 0 }}>
              {label}
            </p>
          </div>
        ))}
        {Object.entries(likesByArticle).map(([slug, count]) => (
          <div key={slug} className="learn-panel" style={{ flex: "1 1 150px" }}>
            <div className="learn-panel__title" style={{ fontSize: "2rem" }}>
              {count} ❤
            </div>
            <p
              className="learn-panel__text"
              style={{ margin: 0, fontSize: "0.78rem", wordBreak: "break-all" }}
            >
              {slug}
            </p>
          </div>
        ))}
      </div>

      {/* Pending comments */}
      <h2 className="h2" style={{ marginBottom: 16 }}>
        Pending{" "}
        {pending.length > 0 && (
          <span style={{ color: "var(--accent)" }}>({pending.length})</span>
        )}
      </h2>
      {pending.length === 0 ? (
        <p className="muted" style={{ marginBottom: 40 }}>
          Nothing pending. All clear.
        </p>
      ) : (
        <div style={{ display: "grid", gap: 12, marginBottom: 40 }}>
          {pending.map((comment) => (
            <div
              key={comment.id}
              className="learn-panel"
              style={{ borderColor: "rgba(255,204,0,0.3)" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 12,
                  flexWrap: "wrap",
                  marginBottom: 10,
                }}
              >
                <div>
                  <strong>{comment.name}</strong>
                  <span
                    className="muted"
                    style={{ marginLeft: 10, fontSize: "0.82rem" }}
                  >
                    on <em>{comment.article_slug}</em> ·{" "}
                    {new Date(comment.created_at).toLocaleString("en-GB")}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <form action={approveCommentAction}>
                    <input type="hidden" name="id" value={comment.id} />
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ padding: "6px 14px", fontSize: "0.85rem" }}
                    >
                      Approve
                    </button>
                  </form>
                  <form action={rejectCommentAction}>
                    <input type="hidden" name="id" value={comment.id} />
                    <button
                      type="submit"
                      className="btn btn-secondary"
                      style={{ padding: "6px 14px", fontSize: "0.85rem" }}
                    >
                      Reject
                    </button>
                  </form>
                </div>
              </div>
              <p style={{ margin: 0 }}>{comment.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Approved comments */}
      {approved.length > 0 && (
        <>
          <h2 className="h2" style={{ marginBottom: 16 }}>
            Approved ({approved.length})
          </h2>
          <div style={{ display: "grid", gap: 12, marginBottom: 40 }}>
            {approved.map((comment) => (
              <div key={comment.id} className="learn-panel">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                    marginBottom: 8,
                  }}
                >
                  <div>
                    <strong>{comment.name}</strong>
                    <span
                      className="muted"
                      style={{ marginLeft: 10, fontSize: "0.82rem" }}
                    >
                      on <em>{comment.article_slug}</em>
                    </span>
                  </div>
                  <form action={rejectCommentAction}>
                    <input type="hidden" name="id" value={comment.id} />
                    <button
                      type="submit"
                      className="btn btn-secondary"
                      style={{ padding: "6px 14px", fontSize: "0.85rem" }}
                    >
                      Remove
                    </button>
                  </form>
                </div>
                <p style={{ margin: 0 }}>{comment.message}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Topic requests */}
      <h2 className="h2" style={{ marginBottom: 16 }}>
        Topic requests ({topicRequests.length})
      </h2>
      {topicRequests.length === 0 ? (
        <p className="muted">No requests yet.</p>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {topicRequests.map((topic) => (
            <div
              key={topic.id}
              className="learn-panel"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: "1 1 200px" }}>
                <p style={{ margin: "0 0 4px" }}>{topic.message}</p>
                <span className="muted" style={{ fontSize: "0.82rem" }}>
                  {new Date(topic.created_at).toLocaleDateString("en-GB")}
                </span>
              </div>
              <form
                action={updateTopicStatusAction}
                style={{ display: "flex", gap: 8, alignItems: "center" }}
              >
                <input type="hidden" name="id" value={topic.id} />
                <select
                  name="status"
                  defaultValue={topic.status}
                  className="learn-input"
                  style={{ width: "auto", padding: "8px 12px" }}
                >
                  <option value="new">New</option>
                  <option value="noted">Noted</option>
                  <option value="done">Done ✓</option>
                </select>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: "8px 16px", fontSize: "0.85rem" }}
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
