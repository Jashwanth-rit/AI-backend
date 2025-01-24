const mongoose = require("mongoose");

const HealthcareTaker = mongoose.model("HealthcareTaker", new mongoose.Schema({
  id: String,
  name: String,
  specialty: String,
  phone: String,
  email: String,
  location: String,
  availability: String,
  image: String
}));

module.exports = HealthcareTaker;
