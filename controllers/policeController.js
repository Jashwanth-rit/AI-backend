const PoliceInfo = require('../models/policeInfo');

// Get all police services
exports.getPoliceServices = async (req, res) => {
  try {
    const policeServices = await PoliceInfo.find(); // Fetch all police service records
    res.status(200).json(policeServices);
  } catch (err) {
    console.error('Error fetching police services:', err);
    res.status(500).json({ 
      error: 'Failed to fetch police services', 
      details: err.message 
    });
  }
};
