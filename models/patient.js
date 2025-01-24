const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  disease: { type: String, required: true },
  moneyRequired: { type: Number, required: true },
  url: { type: String, required: true },
  deadline: { type: Date, required: true },
  place: { type: String, required: true },
  hospitals: { type: [String], required: true }
});

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;
