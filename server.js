const express = require('express');
const { Client } = require('pg');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Create a PostgreSQL client instance
const client = new Client({
  connectionString: process.env.DATABASE_URL, // Connection string from .env
});

client.connect()
  .then(() => {
    console.log('Successfully connected to PostgreSQL');
  })
  .catch((err) => {
    console.error('Database connection error:', err.stack);
  });

// Test database connection route
app.get('/test-db', (req, res) => {
  client.query('SELECT * FROM tips;', (err, result) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      return res.status(500).send('Error querying the database');
    }
    res.json(result.rows); // Return rows from the "tips" table
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
