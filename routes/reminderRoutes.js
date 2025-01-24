const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');

// GET all reminders
router.get('/', reminderController.getReminders);

// POST a new reminder
router.post('/', reminderController.addReminder);

// DELETE a reminder by ID
router.delete('/:id', reminderController.deleteReminder);

module.exports = router;
