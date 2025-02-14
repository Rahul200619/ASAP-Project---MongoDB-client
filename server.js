const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGO_URI; // MongoDB connection string from .env
let client;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((clientObj) => {
    client = clientObj;
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Home route with DB connection status
app.get('/', (req, res) => {
  if (client) {
    res.send('Connected to MongoDB!');
  } else {
    res.send('Failed to connect to MongoDB');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});