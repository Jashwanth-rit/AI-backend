const mongoose = require("mongoose");

const FireExtinguisher = mongoose.model("FireExtinguisher", new mongoose.Schema({
  id: String,
  type: String,
  location: String,
  maintenanceDate: Date,
  expiryDate: Date,
  capacity: String,
  contact: String,
  image: String
}));

module.exports = FireExtinguisher;
