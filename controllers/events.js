const Event = require('../models/Event');

// GET, POST, DELETE and PUT routes
const getEvents = async (request, response) => {
  try {
    const events = await Event.find({});
    response.status(200).json(events);
  }
  catch (error) {
    response.status(500).json({ info: error });
  }
}

const createEvent = async (request, response) => {
  try {
    const event = Event(request.body);
    const savedEvent = await event.save();
    response.status(201).json(savedEvent);
  }
  catch (error) {
    res.status(500).json({ info: error });
  }
}

const updateEvent = async (request, response) => {
  try {
    const { mark } = request.body;
    const updatedEvent = await Event.findByIdAndUpdate(request.params.id, { mark: mark });
    if (updateEvent) {
      response.status(200).json(updatedEvent);
    }
    else {
      response.status(404).json({info: "Event not found"});
    }
  }
  catch {
    res.status(500).json({ info: error });
  }
}

const deleteEvent = async (request, response) => {
  try {
    const deletedEvent = await Event.findByIdAndRemove(request.params.id);
    if (deletedEvent) {
      response.status(200).json(deletedEvent);
    }
    else {
      response.status(404).json({info: "Event not found"});
    }
  }
  catch {
    res.status(500).json({ info: error });
  }
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}