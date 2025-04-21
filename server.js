// server.js

// Required dependencies
const express = require('express');
const { Client } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

// Initialize the app
const app = express();
const port = process.env.PORT || 3000;

// Database connection
const client = new Client({
  connectionString: process.env.DATABASE_URL, // Use the DATABASE_URL from .env file
});

client.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.error('Database connection error:', err.stack);
  });

// Define a route to test the database connection
app.get('/test-db', (req, res) => {
  // Query the "tips" table
  client.query('SELECT * FROM tips;', (err, result) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      return res.status(500).send('Error querying the database');
    }
    res.json(result.rows); // Send the result from the "tips" table as JSON
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
