// server.js
const express = require('express');
const pool = require('./db');  // Import the pool from db.js
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Example route to test database connection
app.get('/test-db', async (req, res) => {
  try {
    // Query the database to see if the connection works
    const result = await pool.query('SELECT NOW()');
    res.json({
      message: 'Database connection successful!',
      time: result.rows[0].now
    });
  } catch (err) {
    console.error('Error connecting to the database:', err);
    res.status(500).json({ message: 'Error connecting to the database' });
  }
});

// Example route to fetch data
app.get('/products', async (req, res) => {
  try {
    // Example query to fetch data from the database
    const result = await pool.query('SELECT * FROM products'); // Replace with your table
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
