// api/tips.js
const mongoose = require('mongoose');
const express = require('express');

// Create a simple express app
const app = express();

// MongoDB URI (ensure it's in .env or use the correct connection string)
const mongoURI = process.env.MONGO_URI;

// Define the Tip schema
const tipSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Tip = mongoose.model('Tip', tipSchema);

// MongoDB Connection
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware to handle JSON requests
app.use(express.json());

// Tips route
app.get('/api/tips', async (req, res) => {
    try {
      const tips = await Tip.find().limit(10); // Limit to 10 tips
      res.status(200).json(tips);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch tips' });
    }
  });
  

// Export serverless handler
module.exports = app;
