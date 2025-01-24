const FireExtinguisher = require('../models/fireExtinguisher');

// Get all fire extinguishers
exports.getFireExtinguishers = async (req, res) => {
  try {
    const fireExtinguishers = await FireExtinguisher.find(); // Fetch all fire extinguisher records
    res.status(200).json(fireExtinguishers);
  } catch (err) {
    console.error('Error fetching fire extinguishers:', err);
    res.status(500).json({ 
      error: 'Failed to fetch fire extinguishers', 
      details: err.message 
    });
  }
};
