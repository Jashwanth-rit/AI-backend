// routes/doctorRoutes.js
const express = require("express");
const {
  getDoctorById,
  getAllDoctorSessions,
} = require("../controllers/doctorController");

const router = express.Router();

// Route for fetching a specific doctor by ID
router.get("/:id", getDoctorById);

// Route for fetching all doctor sessions
router.get("/", getAllDoctorSessions);

module.exports = router;
