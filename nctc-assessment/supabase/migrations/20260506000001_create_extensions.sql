-- Migration 001: Enable required PostgreSQL extensions
-- Run this first before any other migrations

-- pgcrypto gives us gen_random_uuid() and crypt() for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- uuid-ossp for uuid_generate_v4() (kept for compatibility)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
