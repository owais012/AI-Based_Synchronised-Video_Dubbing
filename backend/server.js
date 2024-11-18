const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const {connectToMongoDB}  = require("./src/connect")
const { restrictToLoggedinUserOnly, checkAuth } = require("./src/middleware/authMiddleware");
const userRoute = require("./src/routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// API Routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});
connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/mongoDB").then(() =>
  console.log("Mongodb connected")
);
app.use("/user", userRoute);

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
