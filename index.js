const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// MongoDB URI (your cloud one)
const mongoURI = process.env.MONGO_URI; // Use environment variable for security

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 5 seconds timeout for selecting the server
  socketTimeoutMS: 45000, // 45 seconds timeout for socket
})
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Define Tip schema
const tipSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Tip = mongoose.model('Tip', tipSchema);

// Routes
app.get('/', (req, res) => {
  res.send('🚀 API is running');
});

// Get tips from the database
app.get('/api/tips', async (req, res) => {
  try {
    console.log('Fetching tips...');
    const tips = await Tip.find().limit(10); // Add limit to avoid large responses
    if (!tips.length) {
      return res.status(404).json({ error: 'No tips found' });
    }
    res.json(tips);
  } catch (err) {
    console.error('Error while fetching tips:', err); // Detailed error log
    res.status(500).json({ error: 'Failed to fetch tips' });
  }
});

// Use the provided port or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

