const express = require('express');
const Journey = require('../models/Journey');
const router = express.Router();



// CORS middleware
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Route for fetching and displaying all journeys
router.get('/', async (req, res) => {
  try {
    // Retrieve all documents from the Journey model
    const journeys = await Journey.find();

    // Send the documents as a response
    res.json(journeys);
  } catch (error) {
    res.send({message: error})
  }
});

module.exports = router;
