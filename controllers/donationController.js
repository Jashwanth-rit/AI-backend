const Patient = require('../models/patient'); // Assuming you have a Patient model for donations

// Controller for fetching all donations
const getAllDonations = async (req, res) => {
  try {
    const donations = await Patient.find(); // Fetch all donation records (assuming it's stored in the Patient model)
    res.status(200).json(donations);
  } catch (err) {
    console.error('Error fetching donations:', err);
    res.status(500).json({ 
      message: 'Error fetching donations', 
      error: err.message 
    });
  }
};

module.exports = {
  getAllDonations
};
