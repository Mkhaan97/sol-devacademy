const express = require('express');
const mongoose = require('mongoose');
const journeyRoutes = require('./routes/journeys');
const csvImporter = require('./csv/csvImporter');

const app = express();
const port = 8000;

app.use('/journeys', journeyRoutes);

// Connect to MongoDB
const uri = "mongodb+srv://mkhan:9wn7nw8o@cluster0.fjhmv.mongodb.net/journeylogs?retryWrites=true&w=majority";
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB Atlas');


    // Uncomment the following section to import data from CSV and save to the database IF database is empty.
    
    // csvImporter.importDataFromCSV()
    //   .then(() => {
    //     console.log('Data import complete');
    //   })
    //   .catch((error) => {
    //     console.log('Data import failed', error);
    //   });
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB Atlas:', error);
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });


