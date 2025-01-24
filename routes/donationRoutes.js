const express = require('express');
const router = express.Router();

// Import the controller
const donationController = require('../controllers/donationController');

// Define the route for fetching donations
router.get('/', donationController.getAllDonations);

module.exports = router;
