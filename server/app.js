const express = require('express');
const mongoose = require('mongoose');
const journeyRoutes = require('./routes/journeys');
const stationRoutes = require('./routes/stations');
const journeyImporter = require('./csv/journeyImporter');
const stationImporter = require('./csv/stationImporter')
const app = express();
const port = 8000;

app.use('/journeys', journeyRoutes);
app.use('/stations', stationRoutes)


// Connect to MongoDB Atlas database
const uri = "mongodb+srv://mkhan:9wn7nw8o@cluster0.fjhmv.mongodb.net/journeylogs?retryWrites=true&w=majority";
mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB Atlas');


    // Uncomment the following functions one at a time to import data from CSV and save to the database IF database is empty.
    
    // journeyImporter.importJourneysFromCSV()
    //   .then(() => {
    //     console.log('Journey import complete');
    //   })
    //   .catch((error) => {
    //     console.log('Journey import failed', error);
    //   });

    // stationImporter.importStationsFromCSV()
    //   .then(() => {
    //     console.log('Station import complete');
    //   })
    //   .catch((error) => {
    //     console.log('Station import failed', error);
    //   });
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB Atlas:', error);
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });


