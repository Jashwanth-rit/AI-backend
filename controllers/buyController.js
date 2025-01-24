// controllers/buyController.js
const Buy = require("../models/buy"); // Import the Buy model

// Add a product to the "buy" collection
const addProductToBuy = async (req, res) => {
  try {
    const product = new Buy(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    console.error("Error adding product to Buy database", error);
    res.status(400).send({ error: "Error adding product" });
  }
};

// Get all products from the "buy" collection
const getAllBuyProducts = async (req, res) => {
  try {
    const products = await Buy.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products", details: err.message });
  }
};

// Delete a product by ID from the "buy" collection
const deleteBuyProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Buy.deleteOne({ id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product", details: err.message });
  }
};

module.exports = {
  addProductToBuy,
  getAllBuyProducts,
  deleteBuyProductById,
};
