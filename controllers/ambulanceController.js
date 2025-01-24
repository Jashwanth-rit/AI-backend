const Ambulance = require('../models/ambulance'); // Assuming you have a model for Ambulance

// Controller for fetching all ambulances
const getAllAmbulances = async (req, res) => {
  try {
    const ambulances = await Ambulance.find(); // Fetch all ambulance records
    res.status(200).json(ambulances);
  } catch (err) {
    console.error('Error fetching ambulances:', err);
    res.status(500).json({ 
      error: 'Failed to fetch ambulances', 
      details: err.message 
    });
  }
};

module.exports = {
  getAllAmbulances
};
