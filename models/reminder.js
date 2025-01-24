const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: String, required: true },
  before: { type: Number, required: true },
  after: { type: Number, required: true },
  numberOfTablets: { type: Number, required: true },
  tabletList: { type: [String], required: true }
});

const Reminder = mongoose.model("Reminder", ReminderSchema);

module.exports = Reminder;
