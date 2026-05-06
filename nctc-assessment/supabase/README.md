# NCTC Self-Assessor — Supabase Database Setup Guide
> For the DevOps engineer. Follow these steps in order.

---

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in.
2. Click **New project**, choose your organisation, and fill in:
   - **Project name**: `nctc-assessment` (or any name you prefer)
   - **Database password**: Use a strong password and save it securely.
   - **Region**: Choose the closest region to your users (e.g., Middle East / EU).
3. Wait for the project to finish provisioning (~2 minutes).

---

## 2. Run the Migrations

Go to your Supabase project → **SQL Editor** → **New query**.

Run the migration files **in order** (copy-paste each file's content, then click **Run**):

| Order | File | What it does |
|-------|------|--------------|
| 1 | `migrations/20260506000001_create_extensions.sql` | Enables `pgcrypto` and `uuid-ossp` |
| 2 | `migrations/20260506000002_create_submissions.sql` | Creates the `submissions` table |
| 3 | `migrations/20260506000003_create_admins.sql` | Creates the `admins` table |
| 4 | `migrations/20260506000004_create_indexes.sql` | Adds performance indexes |
| 5 | `migrations/20260506000005_enable_rls.sql` | Enables Row Level Security |

> **Alternative (CLI):** If you have the [Supabase CLI](https://supabase.com/docs/guides/cli) installed and linked to the project, you can run:
> ```bash
> supabase db push
> ```

---

## 3. Create the Initial Admin User

The admin password must be hashed with bcrypt before it is stored. The app's Node.js seed script handles this automatically.

### Option A — via Node.js seed script (recommended)

1. Clone the repo and install dependencies:
   ```bash
   git clone https://github.com/WGhaly/nctc-self-assessor-tmc
   cd nctc-self-assessor-tmc/nctc-assessment
   npm install && cd server && npm install && cd ..
   ```

2. Create `server/.env` (copy from `server/.env.example`) and fill in your Supabase credentials:
   ```env
   DB_HOST=db.<your-supabase-project-ref>.supabase.co
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=<your-supabase-db-password>
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=<choose-a-strong-password-min-12-chars>
   JWT_SECRET=<random-64-char-string>
   PORT=3001
   ```

3. Run the seed script:
   ```bash
   ADMIN_USERNAME=admin ADMIN_PASSWORD=YourStrongPassword node server/src/db/seed.js
   ```

### Option B — via Supabase SQL Editor

1. Generate a bcrypt hash locally:
   ```bash
   node -e "const b=require('bcryptjs'); b.hash('YourPassword',12).then(console.log)"
   ```
2. Open the Supabase SQL editor and run:
   ```sql
   INSERT INTO admins (username, password_hash)
   VALUES ('admin', '<paste-hash-here>')
   ON CONFLICT (username) DO NOTHING;
   ```

---

## 4. Connect the Backend to Supabase

In `server/.env`, set the database connection variables to point at your Supabase project. You can find these in **Supabase → Project Settings → Database → Connection string**:

```env
DB_HOST=db.<project-ref>.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=<your-db-password>
```

> ⚠️ Use **port 5432** (direct connection) for the backend server.  
> Do **not** use the Supabase connection pooler (port 6543) unless you configure session mode — the app uses `SERIAL` primary keys on the admins table which require session-level pooling.

---

## 5. Database Schema Overview

### `submissions` table
Stores every inventor self-assessment form submission.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID (PK) | Auto-generated UUID |
| `created_at` | TIMESTAMPTZ | Submission timestamp |
| `updated_at` | TIMESTAMPTZ | Last modified timestamp |
| `full_name` | VARCHAR(200) | Inventor full name |
| `phone` | VARCHAR(30) | Contact phone number |
| `affiliation` | VARCHAR(300) | University / company |
| `invention_title` | VARCHAR(500) | Title of invention |
| `description` | TEXT | Optional short description (≤300 chars) |
| `sector` | VARCHAR(50) | Industry sector (enum) |
| `sector_other` | VARCHAR(300) | Free text when sector = 'other' |
| `trl` | SMALLINT (1–9) | Technology Readiness Level |
| `mrl` | SMALLINT (1–10) | Manufacturing Readiness Level |
| `crl` | SMALLINT (1–9) | Commercialisation Readiness Level |
| `language` | CHAR(2) | 'ar' or 'en' |
| `declaration` | BOOLEAN | Inventor accepted terms |
| `status` | VARCHAR(20) | pending / reviewed / accepted / rejected |
| `admin_notes` | TEXT | Internal admin notes |

### `admins` table
Stores admin dashboard accounts.

| Column | Type | Description |
|--------|------|-------------|
| `id` | SERIAL (PK) | Auto-increment integer |
| `username` | VARCHAR(100) | Login username (unique) |
| `password_hash` | VARCHAR(200) | bcrypt hash (cost 12) |
| `email` | VARCHAR(200) | Optional email |
| `last_login_at` | TIMESTAMPTZ | Last successful login |
| `is_active` | BOOLEAN | Soft disable account |
| `created_at` | TIMESTAMPTZ | Account creation time |
| `updated_at` | TIMESTAMPTZ | Last modified time |

---

## 6. Verify Everything Works

In the Supabase SQL Editor, run:
```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

You should see: `admins`, `submissions`.

```sql
SELECT username, created_at FROM admins;
```

You should see your admin user.

---

## 7. Environment Variables Checklist for the Server

| Variable | Required | Example |
|----------|----------|---------|
| `DB_HOST` | ✅ | `db.xxxx.supabase.co` |
| `DB_PORT` | ✅ | `5432` |
| `DB_NAME` | ✅ | `postgres` |
| `DB_USER` | ✅ | `postgres` |
| `DB_PASSWORD` | ✅ | your Supabase DB password |
| `JWT_SECRET` | ✅ | random 64-char string |
| `ADMIN_USERNAME` | only for seeding | `admin` |
| `ADMIN_PASSWORD` | only for seeding | strong password |
| `PORT` | optional | `3001` |
| `NODE_ENV` | optional | `production` |
