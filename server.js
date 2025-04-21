const express = require('express');
const { Pool } = require('pg'); // PostgreSQL client
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Database connection setup using Pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT || 5432,
});

// Test endpoint to check DB connection
app.get('/test-db', async (req, res) => {
  try {
    // Query the database (test query)
    const result = await pool.query('SELECT NOW()');
    res.status(200).json({ success: true, message: 'Connected to the database', result: result.rows });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ success: false, message: 'Database connection failed', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
