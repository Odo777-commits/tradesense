const express = require('express');
const app = express();
const pool = require('./db/pool'); // Make sure path is correct

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send({ success: true, time: result.rows[0].now });
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    res.status(500).send({ error: 'Database connection failed', details: err.message });
  }
});

app.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000');
});
