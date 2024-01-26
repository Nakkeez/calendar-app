const mongoose = require('mongoose');

const connectMongoDB = (url) => {
  mongoose.set('strictQuery', false);

  const db = mongoose.connection;

  // Event listener for connection error
  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });

  // Event listener for successful connection
  db.once('open', () => {
    console.log('Connected to the MongoDB database');
  });

  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = connectMongoDB;