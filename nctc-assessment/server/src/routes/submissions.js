const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../db');

const router = express.Router();

const VALID_SECTORS = [
  'agriculture', 'health', 'energy', 'ict',
  'manufacturing', 'defense', 'environment', 'other',
];

// POST /api/submissions
router.post('/', [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Full name must be between 2 and 200 characters'),
  body('phone')
    .trim()
    .isLength({ min: 5, max: 30 })
    .matches(/^[\d\s+\-().]+$/)
    .withMessage('Invalid phone number format'),
  body('affiliation')
    .trim()
    .isLength({ min: 2, max: 300 })
    .withMessage('Affiliation must be between 2 and 300 characters'),
  body('inventionTitle')
    .trim()
    .isLength({ min: 2, max: 500 })
    .withMessage('Invention title must be between 2 and 500 characters'),
  body('description')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 300 })
    .withMessage('Description must be under 300 characters'),
  body('sector').isIn(VALID_SECTORS).withMessage('Invalid sector'),
  body('trl').isInt({ min: 1, max: 9 }).withMessage('TRL must be 1–9'),
  body('mrl').isInt({ min: 1, max: 10 }).withMessage('MRL must be 1–10'),
  body('crl').isInt({ min: 1, max: 9 }).withMessage('CRL must be 1–9'),
  body('language').isIn(['ar', 'en']).withMessage('Invalid language'),
  body('declaration').equals('true').withMessage('Declaration must be accepted'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    fullName, phone, affiliation, inventionTitle,
    description, sector, trl, mrl, crl, language,
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO submissions
         (full_name, phone, affiliation, invention_title, description,
          sector, trl, mrl, crl, language, declaration)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, TRUE)
       RETURNING id, created_at`,
      [
        fullName, phone, affiliation, inventionTitle,
        description || null, sector,
        parseInt(trl), parseInt(mrl), parseInt(crl), language,
      ]
    );

    const row = result.rows[0];
    return res.status(201).json({
      success: true,
      referenceNumber: row.id,
      submittedAt: row.created_at,
    });
  } catch (err) {
    console.error('Submission error:', err);
    return res.status(500).json({ error: 'Failed to save submission. Please try again.' });
  }
});

module.exports = router;
