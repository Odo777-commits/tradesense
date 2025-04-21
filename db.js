const { Client } = require('pg');  // You need to import the Client from pg
require('dotenv').config();  // Ensure this is loaded

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // Use this for SSL connections in production
  },
});

client.connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error('Database connection error:', err.stack);
  });

module.exports = client;
