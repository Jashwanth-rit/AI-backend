const mongoose = require("mongoose");

const DoctorBookedSchema = new mongoose.Schema({
  doctor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'DoctorSession', 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  timeSlot: { 
    type: Date, 
    required: true 
  },
  status: {
    type: String,
    enum: ['Booked', 'Completed', 'Cancelled'],
    default: 'Booked'
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const DoctorBooked = mongoose.model("DoctorBooked", DoctorBookedSchema);

module.exports = DoctorBooked;
