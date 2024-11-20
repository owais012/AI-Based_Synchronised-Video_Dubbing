const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route to save a contact message
router.post('/contact', contactController.saveContactMessage);

// Route to retrieve all contact messages
router.get('/contact', contactController.getAllContactMessages);

module.exports = router;
