const fs = require('fs');
const csv = require('csv-parser');
const Station = require('../models/Station');

async function importStationsFromCSV() {
  return new Promise((resolve, reject) => {
    const fileName = 'Helsingin_ja_Espoon_kaupunkipyB6rA4asemat_avoin.csv';
    let stations = [];

    const processFile = (fileName) => {
      return new Promise((resolve, reject) => {
        let isFirstRow = true;

        fs.createReadStream(fileName)
          .pipe(csv({ headers: false })) // Targeting by index instead of headers because of undefined properties
          .on('data', (data) => {
            if (!isFirstRow) {          // Skip first row of the file because it consists of only headers
              const station = {
                FID: String(data[0]),
                ID: String(data[1]),
                Nimi: String(data[2]),
                Namn: String(data[3]),
                Name: String(data[4]),
                Osoite: String(data[5]),
                Adress: String(data[6]),
                Kaupunki: String(data[7]),
                Stad: String(data[8]),
                Operaattor: String(data[9]),
                Kapasiteet: String(data[10]),
                x: String(data[11]),
                y: String(data[12]),
              };

              stations.push(station);
            }

            isFirstRow = false;
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
