const Reminder = require('../models/reminder');

exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json(reminders);
  } catch (err) {
    console.error('Error fetching reminders:', err);
    res.status(500).json({ error: 'Failed to fetch reminders', details: err.message });
  }
};

exports.addReminder = async (req, res) => {
  try {
    const reminder = new Reminder(req.body);
    const savedReminder = await reminder.save();
    res.status(201).json(savedReminder);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add reminder', details: err.message });
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Reminder.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Reminder not found' });
    }
    res.status(200).json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete reminder', details: error.message });
  }
};
