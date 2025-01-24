// routes/carouselRoutes.js
const express = require("express");
const { getCarouselData } = require("../controllers/carouselController");

const router = express.Router();

// Route to fetch carousel data
router.get("/", getCarouselData);

module.exports = router;
