const mongoose = require("mongoose");

const Buy = mongoose.model("Buy", new mongoose.Schema({
  id: { type: String, required: true },
  price: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true }
}));

module.exports = Buy;
