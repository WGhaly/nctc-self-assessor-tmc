const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Tight rate limit on login — 5 attempts per 15 min per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/admin/login
router.post('/login', loginLimiter, [
  body('username').trim().isLength({ min: 1, max: 100 }),
  body('password').isLength({ min: 1, max: 200 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const { username, password } = req.body;

  try {
    const result = await db.query(
      'SELECT id, username, password_hash FROM admins WHERE username = $1',
      [username]
    );

    const admin = result.rows[0];
    // Always compare (even with dummy hash) to prevent timing-based username enumeration
    const DUMMY = '$2b$12$invalidhashusedfortimingattackprevention00000000000000';
    const isValid = await bcrypt.compare(password, admin ? admin.password_hash : DUMMY);

    if (!admin || !isValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    return res.json({ token, username: admin.username });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/admin/submissions
router.get('/submissions', requireAuth, async (req, res) => {
  const { sector, trl, mrl, crl, page = 1, limit = 50 } = req.query;

  const conditions = [];
  const params = [];
  let idx = 1;

  if (sector) { conditions.push(`sector = $${idx++}`); params.push(sector); }
  if (trl)    { conditions.push(`trl = $${idx++}`);    params.push(parseInt(trl)); }
  if (mrl)    { conditions.push(`mrl = $${idx++}`);    params.push(parseInt(mrl)); }
  if (crl)    { conditions.push(`crl = $${idx++}`);    params.push(parseInt(crl)); }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const safePage  = Math.max(1, parseInt(page)  || 1);
  const safeLimit = Math.min(200, Math.max(1, parseInt(limit) || 50));
  const offset    = (safePage - 1) * safeLimit;

  try {
    const [countRes, rowsRes] = await Promise.all([
      db.query(`SELECT COUNT(*) FROM submissions ${where}`, params),
      db.query(
        `SELECT id, created_at, full_name, phone, affiliation,
                invention_title, sector, trl, mrl, crl, language
         FROM submissions ${where}
         ORDER BY created_at DESC
         LIMIT $${idx++} OFFSET $${idx++}`,
        [...params, safeLimit, offset]
      ),
    ]);

    return res.json({
      submissions: rowsRes.rows,
      total: parseInt(countRes.rows[0].count),
      page: safePage,
      limit: safeLimit,
    });
  } catch (err) {
    console.error('Get submissions error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/admin/submissions/export/csv  (must come before /:id)
router.get('/submissions/export/csv', requireAuth, async (req, res) => {
  const { sector, trl, mrl, crl } = req.query;

  const conditions = [];
  const params = [];
  let idx = 1;

  if (sector) { conditions.push(`sector = $${idx++}`); params.push(sector); }
  if (trl)    { conditions.push(`trl = $${idx++}`);    params.push(parseInt(trl)); }
  if (mrl)    { conditions.push(`mrl = $${idx++}`);    params.push(parseInt(mrl)); }
  if (crl)    { conditions.push(`crl = $${idx++}`);    params.push(parseInt(crl)); }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  try {
    const result = await db.query(
      `SELECT id, created_at, full_name, phone, affiliation,
              invention_title, description, sector, trl, mrl, crl, language
       FROM submissions ${where}
       ORDER BY created_at DESC`,
      params
    );

    const escape = (v) => `"${String(v || '').replace(/"/g, '""')}"`;
    const headers = ['Reference ID', 'Date', 'Full Name', 'Phone', 'Affiliation',
                     'Invention Title', 'Description', 'Sector', 'TRL', 'MRL', 'CRL', 'Language'];
    const rows = result.rows.map((r) => [
      r.id,
      new Date(r.created_at).toISOString().slice(0, 19).replace('T', ' '),
      escape(r.full_name),
      r.phone,
      escape(r.affiliation),
      escape(r.invention_title),
      escape(r.description),
      r.sector,
      r.trl,
      r.mrl,
      r.crl,
      r.language,
    ].join(','));

    const csv = [headers.join(','), ...rows].join('\n');
    const filename = `nctc-submissions-${new Date().toISOString().slice(0, 10)}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.send('\uFEFF' + csv); // BOM for Excel UTF-8
  } catch (err) {
    console.error('CSV export error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/admin/submissions/:id
router.get('/submissions/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!UUID_RE.test(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const result = await db.query('SELECT * FROM submissions WHERE id = $1', [id]);
    if (!result.rows.length) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    return res.json(result.rows[0]);
  } catch (err) {
    console.error('Get submission error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
