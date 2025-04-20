const { Pool } = require('pg');
require('dotenv').config(); // Load env vars

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Railway SSL connections
  },
});

module.exports = pool;
