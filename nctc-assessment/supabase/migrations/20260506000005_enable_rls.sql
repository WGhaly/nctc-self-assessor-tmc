-- Migration 005: Row Level Security (RLS) policies
-- ─────────────────────────────────────────────────────────────────────────────
-- Architecture note
-- ─────────────────────────────────────────────────────────────────────────────
-- This app uses a Node.js/Express backend that connects to Supabase using the
-- SERVICE ROLE key (bypasses RLS) or a dedicated DB user.
-- RLS is still enabled as a defence-in-depth measure — it protects the tables
-- if the Supabase REST/realtime APIs are ever exposed directly.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── submissions ──────────────────────────────────────────────────────────────
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Anonymous users (website visitors) may INSERT a new submission.
-- They cannot read, update, or delete any rows.
CREATE POLICY "public_insert_submissions"
  ON submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Authenticated service role / admin can do everything
-- (The service role bypasses RLS automatically; this policy covers
--  any future use of Supabase Auth with an admin role.)
CREATE POLICY "service_role_all_submissions"
  ON submissions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ── admins ───────────────────────────────────────────────────────────────────
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Only the service role can read or modify admin accounts.
-- No anonymous or regular authenticated access.
CREATE POLICY "service_role_all_admins"
  ON admins
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
