const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// MongoDB URI (your cloud one)
const mongoURI = 'mongodb+srv://odin:Javad111@cluster0.mqvrqsz.mongodb.net/trade_sense?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Define Tip schema
const tipSchema = new mongoose.Schema({
  title: String,
  content: String
});
const Tip = mongoose.model('Tip', tipSchema);

// Routes
app.get('/', (req, res) => {
  res.send('🚀 API is running');
});

app.get('/api/tips', async (req, res) => {
  try {
    const tips = await Tip.find();
    res.json(tips);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tips' });
  }
});

// Use Replit-assigned port or fallback to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
