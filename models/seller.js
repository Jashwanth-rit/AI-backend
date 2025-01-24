const mongoose = require("mongoose");

const Seller = mongoose.model("Seller", new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String
}));

module.exports = Seller;
