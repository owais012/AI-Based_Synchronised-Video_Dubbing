const { v4: uuidv4 } = require("uuid");
const contact_us = require("../models/contact_messages");

async function saveContactUsForm(req, res) {
  const { name, email, message } = req.body;

  // Check if required fields are provided
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    // Attempt to create a new contact_us
    await contact_us.create({ name, email, message });
    res.json({ status: "Signup successful" });
  } catch (error) {
    // Handle Mongoose validation errors or other errors
    console.error('Error during contact_us form:', error);
    res.status(500).json({ error: 'Internal server error' });

  }
}
module.exports = {
  saveContactUsForm,
};