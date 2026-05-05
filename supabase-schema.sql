-- Run this in the Supabase SQL editor (https://app.supabase.com → project → SQL editor)

-- ── Article Likes ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS article_likes (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_slug TEXT NOT NULL,
  fingerprint  TEXT NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE (article_slug, fingerprint)
);

ALTER TABLE article_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read likes"
  ON article_likes FOR SELECT USING (true);

CREATE POLICY "Public can insert a like"
  ON article_likes FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can delete their own like"
  ON article_likes FOR DELETE USING (true);

-- ── Article Comments ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS article_comments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_slug TEXT NOT NULL,
  name         TEXT NOT NULL DEFAULT 'Anonymous',
  message      TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'pending'
                 CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at   TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE article_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read approved comments"
  ON article_comments FOR SELECT USING (status = 'approved');

CREATE POLICY "Public can insert a comment"
  ON article_comments FOR INSERT WITH CHECK (true);

-- ── Topic Requests ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS topic_requests (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message    TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'new'
               CHECK (status IN ('new', 'noted', 'done')),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE topic_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert a topic request"
  ON topic_requests FOR INSERT WITH CHECK (true);

-- NOTE: topic_requests has no public SELECT policy intentionally.
-- The admin page reads it via the service role key which bypasses RLS.
