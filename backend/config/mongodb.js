require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI;

// Function to connect to MongoDB using Mongoose
async function connectToMongoDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Optional timeout settings
    });

    console.log("Successfully connected to MongoDB using Mongoose!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

// Export the connection function
module.exports = {connectToMongoDB};
