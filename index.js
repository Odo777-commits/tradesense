require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Root test route
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`✅ Connected to PostgreSQL: ${result.rows[0].now}`);
  } catch (err) {
    console.error('❌ Error connecting to DB:', err);
    res.status(500).send('Database connection failed');
  }
});

// Example: Fetch latest tip from "tips" table
app.get('/tips', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tips ORDER BY created_at DESC LIMIT 1'
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Failed to fetch tip:', err);
    res.status(500).send('Failed to fetch tip');
  }
});

// Server startup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
