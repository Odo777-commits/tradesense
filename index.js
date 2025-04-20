const express = require('express');
const cors = require('cors');
const pool = require('./db/pool'); // Importing the database pool
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.send('Server is healthy 🚀');
});

// DB test route
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ db_time: result.rows[0].now });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to TradeSense Backend');
});

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
