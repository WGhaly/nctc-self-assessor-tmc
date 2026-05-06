CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Helper function to auto-update updated_at columns
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS submissions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  full_name       VARCHAR(200) NOT NULL,
  phone           VARCHAR(30) NOT NULL,
  affiliation     VARCHAR(300) NOT NULL,
  invention_title VARCHAR(500) NOT NULL,
  description     TEXT,
  sector          VARCHAR(50) NOT NULL
                    CHECK (sector IN (
                      'agriculture', 'health', 'energy', 'ict',
                      'manufacturing', 'defense', 'environment', 'other'
                    )),
  sector_other    VARCHAR(300),
  trl             SMALLINT NOT NULL CHECK (trl BETWEEN 1 AND 9),
  mrl             SMALLINT NOT NULL CHECK (mrl BETWEEN 1 AND 10),
  crl             SMALLINT NOT NULL CHECK (crl BETWEEN 1 AND 9),
  language        CHAR(2) NOT NULL DEFAULT 'ar' CHECK (language IN ('ar', 'en')),
  declaration     BOOLEAN NOT NULL DEFAULT TRUE,
  status          VARCHAR(20) NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  admin_notes     TEXT
);

DROP TRIGGER IF EXISTS trg_submissions_updated_at ON submissions;
CREATE TRIGGER trg_submissions_updated_at
  BEFORE UPDATE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

CREATE TABLE IF NOT EXISTS admins (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(200) NOT NULL,
  email         VARCHAR(200),
  last_login_at TIMESTAMPTZ,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_admins_updated_at ON admins;
CREATE TRIGGER trg_admins_updated_at
  BEFORE UPDATE ON admins
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

CREATE INDEX IF NOT EXISTS idx_submissions_created_at       ON submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_sector           ON submissions(sector);
CREATE INDEX IF NOT EXISTS idx_submissions_status           ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_trl              ON submissions(trl);
CREATE INDEX IF NOT EXISTS idx_submissions_mrl              ON submissions(mrl);
CREATE INDEX IF NOT EXISTS idx_submissions_crl              ON submissions(crl);
CREATE INDEX IF NOT EXISTS idx_submissions_sector_status_date ON submissions(sector, status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admins_username              ON admins(username);
