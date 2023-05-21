const fs = require('fs');
const csv = require('csv-parser');
const Station = require('../models/Station');

async function importStationsFromCSV() {
  return new Promise((resolve, reject) => {
    const fileName = 'Helsingin_ja_Espoon_kaupunkipyB6rA4asemat_avoin.csv';
    let stations = []; 

    const processFile = (fileName) => {
      return new Promise((resolve, reject) => {
        fs.createReadStream(fileName)
          .pipe(csv())
          .on('data', (data) => {
            const station = {
              FID: String(data.FID),
              ID: String(data.ID),
              Nimi: String(data.Nimi),
              Namn: String(data.Namn),
              Name: String(data.Name),
              Osoite: String(data.Osoite),
              Adress: String(data.Adress),
              Kaupunki: String(data.Kaupunki),
              Stad: String(data.Stad),
              Operaattor: String(data.Operaattor),
              Kapasiteet: String(data.Kapasiteet),
              x: String(data.x),
              y: String(data.y),
            };

            stations.push(station);
          })
          .on('end', async () => {
            try {
              await Station.insertMany(stations);
              console.log('Import complete for', fileName);
              resolve();
            } catch (error) {
              console.log('Failed to save error', error);
              reject(error);
            }
          })
          .on('error', (error) => {
            console.log('Failed to parse document', error);
            reject(error);
          });
      });
    };

    processFile(fileName)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = { importStationsFromCSV };