require('dotenv').config();
const express    = require('express');
const helmet     = require('helmet');
const cors       = require('cors');
const rateLimit  = require('express-rate-limit');

const submissionsRouter = require('./routes/submissions');
const adminRouter       = require('./routes/admin');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Security headers ────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ────────────────────────────────────────────────────────────────────
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : ['http://localhost:5173'];

app.use(cors({
  origin: (origin, cb) => {
    // Allow non-browser tools (e.g., Postman) and allowed origins
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('CORS: origin not allowed'));
  },
  credentials: true,
}));

// ── Body parsing (limit size to mitigate DoS) ───────────────────────────────
app.use(express.json({ limit: '16kb' }));

// ── Global rate limit ────────────────────────────────────────────────────────
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again later.' },
}));

// Tighter limit for submission endpoint
const submissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20,
  message: { error: 'Too many submissions from this IP. Please try again later.' },
});

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/submissions', submissionLimiter, submissionsRouter);
app.use('/api/admin',       adminRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// 404
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

// Global error handler — never leak stack traces to client
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Only start the HTTP server when run directly (not when imported by Vercel)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`NCTC Assessment API listening on port ${PORT}`);
  });
}

module.exports = app;
