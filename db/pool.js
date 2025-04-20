const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false // Disables certificate validation (needed for Railway and many cloud providers)
  },
  connectionTimeoutMillis: 5000, // 5 seconds timeout to wait for a connection
  idleTimeoutMillis: 10000 // 10 seconds idle timeout
});

module.exports = pool;
