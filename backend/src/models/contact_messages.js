const db = require('../../config/db'); // Adjust the path to your db configuration

// Function to save a contact message
const saveContactMessage = (name, email, message, callback) => {
  const query = `INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)`;
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error saving contact message:', err);
      return callback(err);
    }
    callback(null, result);
  });
};

// Function to get all contact messages
const getAllContactMessages = (callback) => {
  const query = `SELECT * FROM contact_messages ORDER BY created_at DESC`;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching contact messages:', err);
      return callback(err);
    }
    callback(null, results);
  });
};

module.exports = {
  saveContactMessage,
  getAllContactMessages,
};
