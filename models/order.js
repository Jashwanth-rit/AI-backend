const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  products: [
    {
      id: { type: String},
      name: { type: String, required: true },
      price: { type: String, required: true },
      description: { type: String },
      url: { type: String, required: true },
      category: { type: String, required: true }
    }
  ],
  userDetails: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pickupTime: { type: String, required: true },
    orderDay: { type: String, required: true },
    paymentMethod: { type: String, required: true }
  },
  billDetails: {
    totalCost: { type: Number, required: true },
    tax: { type: Number, required: true },
    discount: { type: Number, required: true },
    deliveryCharge: { type: Number, required: true },
    finalAmount: { type: Number, required: true }
  }
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
