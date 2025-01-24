const mongoose = require("mongoose");

const AmbulanceSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true },
  imageurl: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  currentPlace: { type: String, required: true },
  availability: { type: Boolean, required: true }
});

const Ambulance = mongoose.model("Ambulance", AmbulanceSchema);

module.exports = Ambulance;
