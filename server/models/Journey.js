const mongoose = require('mongoose');


// Model for each journey from the csv file

const journeySchema = new mongoose.Schema({
  Departure: String,
  Return: String,
  'Departure station id': String,
  'Departure station name': String,
  'Return station id': String,
  'Return station name': String,
  'Covered distance (m)': Number,
  'Duration (sec.)': Number
}, { strict: false });

const Journey = mongoose.model('Journey', journeySchema);

module.exports = Journey;