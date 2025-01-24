const mongoose = require("mongoose");

const PoliceInfo = mongoose.model("PoliceInfo", new mongoose.Schema({
  id: String,
  officerName: String,
  badgeNumber: String,
  station: String,
  location: String,
  contact: String,
  jurisdiction: String,
  email: String,
  image: String
}));

module.exports = PoliceInfo;
