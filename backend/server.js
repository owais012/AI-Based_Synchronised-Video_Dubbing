const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly, checkAuth } = require("./src/middleware/authMiddleware");
const userRoute = require("./src/routes/authRoutes");
const pool = require('./config/db');
const { connectToMongoDB } = require('./config/mongodb'); // Adjust the path as needed
const contactRoutes = require('./src/routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/mongoDB").then(() =>
//   console.log("Mongodb connected")
// );

connectToMongoDB();

(async () => {
  try {
    // Test the connection
    const connection = await pool.getConnection();
    console.log('Connected to the database successfully!');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
})();

// API Routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});
app.use("/user", userRoute);
app.use('/api', contactRoutes);


// Serve frontend
const frontendPath = path.join(__dirname, '../frontend/dist');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(frontendPath, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
