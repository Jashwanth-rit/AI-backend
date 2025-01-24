// controllers/carouselController.js
const Carousel = require("../models/carousel"); // Import the Carousel model

// Fetch carousel data with an optional limit
const getCarouselData = async (req, res) => {
  try {
    const limit = req.query._limit ? parseInt(req.query._limit) : 0; // Parse limit from query params
    const carousel = await Carousel.find().limit(limit); // Fetch data with optional limit
    res.status(200).json(carousel); // Send data as JSON
  } catch (error) {
    console.error("Error fetching carousel data", error); // Log error to the server
    res.status(500).send({ message: "Error fetching carousel data", error }); // Send error response
  }
};

module.exports = {
  getCarouselData,
};
