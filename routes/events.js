const express = require('express');
const router = express.Router();

// const { requiresAuth } = require('express-openid-connect')

const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/events');

router.get('/', getEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;