const express = require('express');
const router = express.Router();
const healthcareTakersController = require('../controllers/healthcareTakerController');

// Route to get all healthcare takers
router.get('/healthcare-takers', healthcareTakersController.getHealthcareTakers);

module.exports = router;
