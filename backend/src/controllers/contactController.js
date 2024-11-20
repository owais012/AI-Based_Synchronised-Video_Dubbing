const ContactModel = require('../models/contact_messages');

// Handler for saving a contact message
exports.saveContactMessage = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  ContactModel.saveContactMessage(name, email, message, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save message' });
    }
    res.status(201).json({ message: 'Message saved successfully', id: result.insertId });
  });
};

// Handler for retrieving all contact messages
exports.getAllContactMessages = (req, res) => {
  ContactModel.getAllContactMessages((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve messages' });
    }
    res.json(results);
  });
};
