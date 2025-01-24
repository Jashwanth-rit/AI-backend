// controllers/doctorController.js
const Doctor = require("../models/doctor");
const DoctorSession = require("../models/DoctorSession");

// Fetch a specific doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findOne({ id }); // Adjust this based on your schema
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doctor data", details: err.message });
  }
};

// Fetch all doctor sessions
const getAllDoctorSessions = async (req, res) => {
  try {
    const doctorSessions = await DoctorSession.find(); // Fetch all sessions
    res.status(200).send(doctorSessions);
  } catch (error) {
    console.error("Error fetching doctor sessions:", error);
    res.status(400).send({ error: "Error fetching doctor sessions" });
  }
};

module.exports = {
  getDoctorById,
  getAllDoctorSessions,
};
