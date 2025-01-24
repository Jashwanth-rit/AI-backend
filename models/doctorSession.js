const mongoose = require("mongoose");

const DoctorSessionSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  imageurl: { type: String, required: true },
  age: { type: Number, required: true },
  fees: { type: Number, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ["Physical Treatment", "Mental Health", "Suggestions", "Precautions", "Pregnancy"] 
  },
  availability: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now }
});

const DoctorSession = mongoose.model("DoctorSession", DoctorSessionSchema);

module.exports = DoctorSession;
