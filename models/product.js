const mongoose = require("mongoose");

const Product = mongoose.model("Product", new mongoose.Schema({
  id: String,
  name: String,
  price: String,
  url: String,
  description: String,
  category: String
}));

module.exports = Product;
