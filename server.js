// server.js

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Needed for Railway SSL
  },
});

// Health check route
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ time: result.rows[0].now });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Get all tips
app.get('/tips', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tips ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Tips fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch tips' });
  }
});

// Add a new tip (optional POST route)
app.post('/tips', async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tips (title, content) VALUES ($1, $2) RETURNING *',
      [title, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error adding tip:', err);
    res.status(500).json({ error: 'Failed to add tip' });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
});
