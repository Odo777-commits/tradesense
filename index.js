// index.js
const express = require('express');
const pool = require('./db/pool'); // adjust path if needed
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tips LIMIT 1'); // Make sure 'tips' table exists
    res.json(result.rows[0]);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
