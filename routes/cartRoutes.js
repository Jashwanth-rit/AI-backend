// routes/cartRoutes.js
const express = require("express");
const {
  addToCart,
  getCartItems,
  deleteCartItem,
} = require("../controllers/cartController");

const router = express.Router();

// Route to add an item to the cart
router.post("/", addToCart);

// Route to get all cart items
router.get("/", getCartItems);

// Route to delete a cart item by ID
router.delete("/:id", deleteCartItem);

module.exports = router;
