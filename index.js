require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to PostgreSQL using DATABASE_URL
const pool = new Pool({
  connectionString: 'postgresql://postgres:XsJAefaToZFuYnZczYtweYbhcDypDMkt@mainline.proxy.rlwy.net:29598/railway',
  ssl: {
    rejectUnauthorized: false, // Needed for SSL connection to Railway
  },
});


// Test route
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Connected to PostgreSQL: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection failed');
  }
});

// Example route to get daily tips (from a "tips" table)
app.get('/tips', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tips ORDER BY created_at DESC LIMIT 1');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch tip');
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
