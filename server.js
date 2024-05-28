// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const dbURI = 'mongodb://localhost:27017/';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema and model
const placeSchema = new mongoose.Schema({
  name: String,
  formatted: String,
  lat: Number,
  lon: Number,
  category: String
});

const Place = mongoose.model('Place', placeSchema);

// Route to handle saving data to MongoDB
app.post('/api/savePlace', (req, res) => {
  const { name, formatted, lat, lon, category } = req.body;

  const newPlace = new Place({ name, formatted, lat, lon, category });
  
  newPlace.save()
    .then(place => res.status(201).json(place))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
