const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  FID: String,
  ID: String,
  Nimi: String,
  Namn: String,
  Name: String,
  Osoite: String,
  Adress: String,
  Kaupunki: String,
  Stad: String,
  Operaattor: String,
  Kapasiteet: String,
  x: String,
  y: String,
});

const Station = mongoose.model('Station', stationSchema);

module.exports = Station;