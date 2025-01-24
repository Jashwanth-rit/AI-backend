const mongoose = require("mongoose");

const Cart = mongoose.model("Cart", new mongoose.Schema({
  id: String,
  price: String,
  name: String,
  url: String,
  description: String,
  category: String
}));

module.exports = Cart;
