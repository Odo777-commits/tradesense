const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// PostgreSQL config using DATABASE_URL from .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // This is the connection string for Railway PostgreSQL database
  ssl: {
    rejectUnauthorized: false // Make sure SSL is set to true for production
  },
});

// Health check route to ensure the server is up
app.get('/health', (req, res) => {
  res.send('Server is healthy 🚀');
});

// DB test route to verify DB connectivity
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ db_time: result.rows[0].now });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start server on specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
