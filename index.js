const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const pool = require('./db/pool');
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ db_time: result.rows[0].now });
  } catch (err) {
    console.error('DB test failed:', err);
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
