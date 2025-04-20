const express = require('express');
const app = express();
const pool = require('./db/pool'); // adjust if your path differs

// Test route to check DB connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send({ success: true, time: result.rows[0].now });
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    res.status(500).send({ error: 'Database connection failed', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
