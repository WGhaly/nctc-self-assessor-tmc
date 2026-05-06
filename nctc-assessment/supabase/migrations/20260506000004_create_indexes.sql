-- Migration 004: Create performance indexes
-- Optimises common admin dashboard queries (filter by sector, readiness levels, date).

-- Submissions: chronological listing (default sort in admin dashboard)
CREATE INDEX IF NOT EXISTS idx_submissions_created_at
  ON submissions (created_at DESC);

-- Submissions: filter by sector
CREATE INDEX IF NOT EXISTS idx_submissions_sector
  ON submissions (sector);

-- Submissions: filter by TRL / MRL / CRL individually
CREATE INDEX IF NOT EXISTS idx_submissions_trl ON submissions (trl);
CREATE INDEX IF NOT EXISTS idx_submissions_mrl ON submissions (mrl);
CREATE INDEX IF NOT EXISTS idx_submissions_crl ON submissions (crl);

-- Submissions: filter by workflow status
CREATE INDEX IF NOT EXISTS idx_submissions_status
  ON submissions (status);

-- Submissions: composite index for the most common combined admin filter
--   (sector + status + date — covers paginated dashboard list)
CREATE INDEX IF NOT EXISTS idx_submissions_sector_status_date
  ON submissions (sector, status, created_at DESC);

-- Admins: fast username lookup on login
CREATE INDEX IF NOT EXISTS idx_admins_username
  ON admins (username);
