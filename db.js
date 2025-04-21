// db.js
require('dotenv').config();  // Load environment variables from .env file
const { Pool } = require('pg');

// Create a new pool with PostgreSQL credentials from .env
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Export the pool so it can be used in other parts of the app
module.exports = pool;
