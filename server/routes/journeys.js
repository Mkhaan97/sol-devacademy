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

// Route for fetching and displaying paginated journeys
router.get('/', async (req, res) => {
  try {
    const { limit = 100, page = 1 } = req.query;

    const skip = (page - 1) * limit;
    const totalJourneys = await Journey.countDocuments();
    const totalPages = Math.ceil(totalJourneys / limit);

    const journeys = await Journey.find()
      .skip(skip)
      .limit(parseInt(limit, 10));

    res.json({
      journeys,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch journeys' });
  }
});

module.exports = router;