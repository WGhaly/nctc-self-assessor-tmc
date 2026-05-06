require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host:     process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || 'nctc_assessment',
  user:     process.env.DB_USER     || 'nctc_user',
  password: process.env.DB_PASSWORD,
});

async function setup() {
  const client = await pool.connect();
  try {
    console.log('⏳ Creating database schema...');
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await client.query(schema);
    console.log('✅ Schema ready.');

    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('❌ ADMIN_PASSWORD environment variable is required. Set it in your .env file.');
      process.exit(1);
    }

    if (adminPassword.length < 12) {
      console.error('❌ ADMIN_PASSWORD must be at least 12 characters for security.');
      process.exit(1);
    }

    const hash = await bcrypt.hash(adminPassword, 12);
    await client.query(
      `INSERT INTO admins (username, password_hash)
       VALUES ($1, $2)
       ON CONFLICT (username) DO UPDATE SET password_hash = $2`,
      [adminUsername, hash]
    );

    console.log(`✅ Admin user '${adminUsername}' created/updated.`);
    console.log('🚀 Setup complete. You can now start the server.');
  } catch (err) {
    console.error('❌ Setup failed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

setup();
