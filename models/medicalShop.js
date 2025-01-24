const mongoose = require("mongoose");

const MedicalShopSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  availability: { type: Boolean, required: true },
  openingHours: { type: String, required: true },
  emergencyServices: { type: Boolean, default: false }
});

const MedicalShop = mongoose.model("MedicalShop", MedicalShopSchema);

module.exports = MedicalShop;
