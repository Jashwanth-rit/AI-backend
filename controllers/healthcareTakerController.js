const HealthcareTaker = require('../models/healthcareTaker');

// Get all healthcare takers
exports.getHealthcareTakers = async (req, res) => {
  try {
    const takers = await HealthcareTaker.find(); // Fetch all healthcare taker records
    res.status(200).json(takers);
  } catch (err) {
    console.error('Error fetching healthcare takers:', err);
    res.status(500).json({ 
      error: 'Failed to fetch healthcare takers', 
      details: err.message 
    });
  }
};
