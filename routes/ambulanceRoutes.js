const express = require('express');
const router = express.Router();

// Import the controller
const ambulanceController = require('../controllers/ambulanceController');

// Define the route for fetching ambulances
router.get('/', ambulanceController.getAllAmbulances);

module.exports = router;
