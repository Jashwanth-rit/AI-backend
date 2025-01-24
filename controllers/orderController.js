// controllers/orderController.js
const Order = require("../models/order");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(400).send({ error: "Error creating order" });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(400).send({ error: "Error fetching orders" });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send({ error: "Order not found" });
    }
    res.status(200).send({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order", error);
    res.status(400).send({ error: "Error deleting order" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  deleteOrder,
};
