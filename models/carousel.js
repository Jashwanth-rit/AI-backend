const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }
});

const Carousel = mongoose.model("Carousel", carouselSchema);

module.exports = Carousel;
