const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./db/pool');

const app = express();
app.use(cors());
app.use(express.json());

// Example route to get daily tips
app.get('/daily_tips', async (req, res) => {
  try {
    const tips = await pool.query('SELECT * FROM daily_tips');
    res.json(tips.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
