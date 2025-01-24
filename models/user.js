const mongoose = require("mongoose");

const User = mongoose.model("User", new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String
}));

module.exports = User;
