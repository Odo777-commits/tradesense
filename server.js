const express = require('express');
const client = require('./db'); // Assuming db.js is managing the database connection
const app = express();

// Your existing routes here...

// Route to get data from the 'tips' table in the 'railway' database
app.get('/tips', async (req, res) => {
  try {
    // Query to fetch data from the 'tips' table
    const result = await client.query('SELECT * FROM tips');

    // Send back the rows from the 'tips' table as JSON
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tips:', err);
    res.status(500).send('Server error');
  }
});

// Your existing server listen code here...
