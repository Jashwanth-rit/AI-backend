// routes/orderRoutes.js
const express = require("express");
const {
  createOrder,
  getOrders,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

// Route to create a new order
router.post("/", createOrder);

// Route to get all orders
router.get("/", getOrders);

// Route to delete an order by ID
router.delete("/:id", deleteOrder);

module.exports = router;
