CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS submissions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  full_name       VARCHAR(200) NOT NULL,
  phone           VARCHAR(30) NOT NULL,
  affiliation     VARCHAR(300) NOT NULL,
  invention_title VARCHAR(500) NOT NULL,
  description     TEXT,
  sector          VARCHAR(50) NOT NULL,
  trl             SMALLINT NOT NULL CHECK (trl BETWEEN 1 AND 9),
  mrl             SMALLINT NOT NULL CHECK (mrl BETWEEN 1 AND 10),
  crl             SMALLINT NOT NULL CHECK (crl BETWEEN 1 AND 9),
  language        CHAR(2) NOT NULL DEFAULT 'ar' CHECK (language IN ('ar', 'en')),
  declaration     BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS admins (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(200) NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_sector     ON submissions(sector);
CREATE INDEX IF NOT EXISTS idx_submissions_trl        ON submissions(trl);
CREATE INDEX IF NOT EXISTS idx_submissions_mrl        ON submissions(mrl);
CREATE INDEX IF NOT EXISTS idx_submissions_crl        ON submissions(crl);
