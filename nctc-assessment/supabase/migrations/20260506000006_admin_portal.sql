-- Migration 006: Admin portal enhancements
-- Adds any schema elements needed by the full admin CRUD portal.
-- The submissions table already has `status` and `admin_notes` (migration 002).
-- This migration adds nothing new to the schema — it documents the expected
-- runtime behaviour and adds a helper view used by the admin dashboard.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Admin summary view ────────────────────────────────────────────────────────
-- Provides per-status counts used by the admin dashboard overview.
CREATE OR REPLACE VIEW admin_submissions_summary AS
SELECT
  status,
  COUNT(*)                                  AS total,
  COUNT(*) FILTER (WHERE language = 'ar')   AS total_ar,
  COUNT(*) FILTER (WHERE language = 'en')   AS total_en,
  AVG(trl)::NUMERIC(4,2)                    AS avg_trl,
  AVG(mrl)::NUMERIC(4,2)                    AS avg_mrl,
  AVG(crl)::NUMERIC(4,2)                    AS avg_crl
FROM submissions
GROUP BY status;

-- Grant service role read access to the view
GRANT SELECT ON admin_submissions_summary TO service_role;

-- ── Ensure admins.last_login_at is updated on successful login ────────────────
-- The Node.js login route should call:
--   UPDATE admins SET last_login_at = NOW() WHERE id = $1
-- No trigger is needed here — it is a simple column update done in application code.

-- ── RLS: allow service_role to SELECT the view ───────────────────────────────
-- Views inherit the RLS of their base tables; service_role bypasses RLS,
-- so no extra policy is needed.
