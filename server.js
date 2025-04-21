require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Needed for Railway public access
  },
});

// Test route to check DB connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database connected: ${result.rows[0].now}`);
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send('Failed to connect to the database.');
  }
});

// Route to get all tips
app.get('/tips', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tips');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tips:', err);
    res.status(500).json({ error: 'Failed to fetch tips' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
