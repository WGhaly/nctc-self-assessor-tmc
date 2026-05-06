# NCTC Self Assessment Tool

Self-assessment tool for Technology, Manufacturing, and Commercial Readiness Levels — built for the National Center of Technology Commercialization (NCTC), Egypt.

## Prerequisites

- **Node.js** 18+ and npm 10+
- **PostgreSQL** 14+ (or Docker)

---

## Setup

### 1. Clone & Install Dependencies

```bash
cd "nctc-assessment"

# Install all packages
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### 2. Configure the Backend

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nctc_assessment
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=a_long_random_secret_64_chars_minimum
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_admin_password
ALLOWED_ORIGINS=http://localhost:5173
```

### 3. Start PostgreSQL

**Option A — Docker (recommended for development):**
```bash
# From the project root
docker-compose up -d
```

**Option B — Local PostgreSQL:**
Create a database and user manually, then set the credentials in `.env`.

### 4. Initialize the Database

```bash
cd server
ADMIN_PASSWORD=your_admin_password node src/db/seed.js
```

This creates the tables and the initial admin user.

### 5. Run the App

```bash
# From project root — starts both server (port 3001) and client (port 5173)
npm run dev
```

Or run separately:
```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

Open **http://localhost:5173** for the public app.

---

## Admin Panel

Navigate to **http://localhost:5173/admin** and sign in with the admin credentials you set during setup.

Features:
- View all submissions with filters (sector, TRL, MRL, CRL)
- Export filtered results as CSV
- View full submission detail

---

## Project Structure

```
nctc-assessment/
├── server/                   # Express API (port 3001)
│   ├── src/
│   │   ├── db/               # PostgreSQL schema, pool, seed script
│   │   ├── middleware/       # JWT auth
│   │   ├── routes/           # submissions.js, admin.js
│   │   └── index.js          # App entry point
│   ├── .env.example
│   └── package.json
├── client/                   # React + Vite frontend (port 5173)
│   ├── public/
│   │   └── nctc-logo.png
│   ├── src/
│   │   ├── components/       # Header, ProgressStepper, InfoModal
│   │   ├── context/          # AssessmentContext (multi-step state)
│   │   ├── data/             # criteria.js (all TRL/MRL/CRL levels)
│   │   ├── locales/          # en.json, ar.json
│   │   ├── pages/            # Landing, InventorForm, MatrixAssessment, Review, Confirmation
│   │   └── pages/admin/      # AdminLogin, AdminDashboard, SubmissionDetail
│   └── package.json
├── docker-compose.yml        # PostgreSQL for development
└── package.json              # Workspace scripts
```

---

## Security

- **Helmet.js** — HTTP security headers
- **CORS** — Restricted to configured origins only
- **Rate limiting** — Global (100/15min), submissions (10/hr), login (10/15min)
- **JWT** — 8-hour tokens for admin sessions
- **bcrypt** (cost 12) — Admin password hashing
- **Parameterized queries** — No SQL injection risk
- **Input validation** — express-validator on all endpoints
- **UUID v4** — Non-guessable submission reference IDs

---

## Production Deployment

1. Build the frontend: `cd client && npm run build`
2. Serve `client/dist/` via nginx or a static host
3. Run the Express server behind nginx as a reverse proxy
4. Set `DB_SSL=true` and `ALLOWED_ORIGINS` to your production domain
5. Use strong, unique values for `JWT_SECRET` and `ADMIN_PASSWORD`
