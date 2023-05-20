const express = require('express');
const Station = require('../models/Station');
const router = express.Router();

// CORS middleware
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// Route for fetching and displaying paginated stations
router.get('/', async (req, res) => {
  try {
    const { limit = 100, page = 1 } = req.query;

    const skip = (page - 1) * limit;
    const totalStations = await Station.countDocuments();
    const totalPages = Math.ceil(totalStations / limit);

    const stations = await Station.find()
      .skip(skip)
      .limit(parseInt(limit, 10));

    res.json({
      stations,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stations' });
  }
});

module.exports = router;