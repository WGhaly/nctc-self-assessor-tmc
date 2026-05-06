-- Migration 003: Create the admins table
-- Stores dashboard admin accounts.
-- Passwords are hashed with bcrypt (cost 12) by the Node.js server before storage.
-- Do NOT store plain-text passwords here.

CREATE TABLE IF NOT EXISTS admins (
  id             SERIAL       PRIMARY KEY,
  username       VARCHAR(100) UNIQUE NOT NULL,
  password_hash  VARCHAR(200) NOT NULL,        -- bcrypt hash (cost ≥ 12)
  email          VARCHAR(200),                 -- optional, for password recovery
  last_login_at  TIMESTAMPTZ,
  is_active      BOOLEAN      NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Keep updated_at in sync
CREATE TRIGGER trg_admins_updated_at
  BEFORE UPDATE ON admins
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();   -- function created in migration 002
