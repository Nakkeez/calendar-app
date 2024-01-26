const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  task: { type: String, required: true },
  course: { type: String, required: false },
  mark: { type: Number, required: false }
})

module.exports = mongoose.model('Event', eventSchema, 'events');