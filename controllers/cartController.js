// controllers/cartController.js
const Cart = require("../models/cart");

// Add a new item to the cart
const addToCart = async (req, res) => {
  try {
    const cartItem = new Cart(req.body);
    await cartItem.save();
    res.status(201).send(cartItem);
  } catch (error) {
    console.error("Error adding to cart", error);
    res.status(400).send({ error: "Error adding to cart" });
  }
};

// Get all cart items
const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).send(cartItems);
  } catch (error) {
    console.error("Error fetching cart items", error);
    res.status(400).send({ error: "Error fetching cart items" });
  }
};

// Delete an item from the cart by ID
const deleteCartItem = async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!cartItem) {
      return res.status(404).send({ error: "Cart item not found" });
    }
    res.status(200).send({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item", error);
    res.status(400).send({ error: "Error deleting cart item" });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  deleteCartItem,
};
