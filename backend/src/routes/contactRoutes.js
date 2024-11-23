const express = require('express');
const router = express.Router();
const  {saveContactUsForm} = require('../controllers/contactController');

// Route to save a contact message
router.post('/contact',   saveContactUsForm);

// Route to retrieve all contact messages
// router.get('/contact', contactController.getAllContactMessages);

module.exports = router;
