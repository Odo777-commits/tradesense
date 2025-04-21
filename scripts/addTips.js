const mongoose = require('mongoose');
require('dotenv').config();
const Tip = require('../models/Tip'); // Make sure the Tip model is correctly created

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1); // Exit if connection fails
  });

const tips = [
  { title: "Stay Updated", description: "Always check the latest market news before making a move." },
  { title: "Risk Management", description: "Never invest more than you can afford to lose." },
  { title: "Diversify", description: "Don't put all your assets in one basket. Spread the risk." }
];

async function addTips() {
  try {
    await Tip.insertMany(tips);
    console.log("✅ Tips added successfully!");
    mongoose.disconnect(); // Disconnect from MongoDB after inserting the data
  } catch (err) {
    console.error("❌ Error adding tips:", err);
    mongoose.disconnect(); // Ensure we disconnect even if there's an error
  }
}

addTips();
