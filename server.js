const express = require('express');
const { Client } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Database client setup using connection string from environment
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Database connection error', err));

// Simple endpoint to test DB connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await client.query('SELECT NOW()'); // Simple query to test connection
    res.json({ status: 'success', time: result.rows[0].now });
  } catch (err) {
    console.log('Error executing query', err);
    res.status(500).json({ status: 'error', message: 'Database query failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
