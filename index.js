require('dotenv').config()
const path = require('path');
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

const { auth, requiresAuth } = require('express-openid-connect')

const config = {
  authRequired: process.env.AUTH_REQUIRED,
  auth0Logout: process.env.AUTH0_LOGOUT,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET
}

app.use(auth(config))
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.static(path.join(__dirname + '/client')));

mongoose.set('strictQuery', false);
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

// Login
app.get('/', (request, response) => {
  if (request.oidc.isAuthenticated()) {
    console.log(request.oidc.isAuthenticated())
    response.sendFile(__dirname + '/index.html')
  }
  else {
    response.redirect(__dirname + '/login');
  }
})

// GET, POST, DELETE and PUT routes
app.get('/events', requiresAuth(), async (request, response) => {
  const events = await Event.find({})
  response.json(events)
})

app.post('/events', requiresAuth(), async (request, response) => {
  const event = Event(request.body)
  const savedEvent = await event.save()
  response.json(savedEvent)  
})

app.delete('/events/:id', requiresAuth(), async (request, response) => {
  const deletedEvent = await Event.findByIdAndRemove(request.params.id)
  if (deletedEvent) response.json(deletedEvent)
  else response.status(404).end()
})

app.put('/events/:id', requiresAuth(), async (request, response) => {
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