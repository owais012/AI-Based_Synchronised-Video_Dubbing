const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the Vite's 'dist' folder
app.use(express.static(path.join(__dirname, '../client/src/dist')));

// Catch-all route to send back the index.html from the 'dist' folder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/dist', 'index.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
