const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 5001;

// PostgreSQL connection config (edit as needed)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:XsJAefaToZFuYnZczYtweYbhcDypDMkt@mainline.proxy.rlwy.net:29598/railway',
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(cors());
app.use(express.json());

app.get('/api/tips', async (req, res) => {
  try {
    const result = await pool.query('SELECT content FROM tips ORDER BY RANDOM() LIMIT 1');
    if (result.rows.length > 0) {
      res.json({ content: result.rows[0].content });
    } else {
      res.status(404).json({ error: 'No tips found' });
    }
  } catch (err) {
    console.error('Error querying DB:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${5001}`);
});
