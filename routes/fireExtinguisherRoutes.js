const express = require('express');
const router = express.Router();
const fireExtinguisherController = require('../controllers/fireExtinguisherController');

// Route to get all fire extinguishers
router.get('/fire-extinguishers', fireExtinguisherController.getFireExtinguishers);

module.exports = router;
