require('dotenv').config()
const path = require('path');
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

mongoose.set('strictQuery', false);

app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/client')));

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connected to the database')
})

// Scheema
const eventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  task: { type: String, required: true },
  course: { type: String, required: false },
  mark: { type: Number, required: false }
})

// Model
const Event = mongoose.model('Event', eventSchema, 'events')

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html')
})

// GET, POST, DEL and PUT routes
app.get('/events', async (request, response) => {
  const events = await Event.find({})
  response.json(events)
})

app.post('/events', async (request, response) => {
  const event = Event(request.body)
  const savedEvent = await event.save()
  response.json(savedEvent)  
})

app.delete('/events/:id', async (request, response) => {
  const deletedEvent = await Event.findByIdAndRemove(request.params.id)
  if (deletedEvent) response.json(deletedEvent)
  else response.status(404).end()
})

app.put('/events/:id', async (request, response) => {
  const { mark } = request.body
  const updatedEvent = await Event.findByIdAndUpdate(request.params.id, { mark: mark })
  if (updatedEvent) {
    response.json(updatedEvent)
  } else {
    response.status(204).end()
  }
})

app.listen(port, () => {
  console.log(`Calendar app listening on port ${port}`)
})