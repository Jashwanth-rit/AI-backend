// routes/buyRoutes.js
const express = require("express");
const {
  addProductToBuy,
  getAllBuyProducts,
  deleteBuyProductById,
} = require("../controllers/buyController");

const router = express.Router();

// Route for adding a product to the "buy" collection
router.post("/", addProductToBuy);

// Route for fetching all products from the "buy" collection
router.get("/", getAllBuyProducts);

// Route for deleting a product by ID from the "buy" collection
router.delete("/:id", deleteBuyProductById);

module.exports = router;
