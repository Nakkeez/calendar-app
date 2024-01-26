require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const { auth, requiresAuth } = require('express-openid-connect');

const { PORT, MONGO_URI } = process.env;
const events = require('./routes/events');
const connectMongoDB = require('./config/db');

const app = express();

const config = {
  authRequired: process.env.AUTH_REQUIRED,
  auth0Logout: process.env.AUTH0_LOGOUT,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET
}

app.use(auth(config));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname + '/public')))

app.use('/events', requiresAuth(), events);

const startServer = () => {
  try {
    connectMongoDB(MONGO_URI);
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  }
  catch (error) {
    console.log(error);
  }
}

startServer();