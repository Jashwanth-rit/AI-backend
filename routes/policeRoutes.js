const express = require('express');
const router = express.Router();
const policeServicesController = require('../controllers/policeController');

// Route to get all police services
router.get('/police-services', policeServicesController.getPoliceServices);

module.exports = router;
