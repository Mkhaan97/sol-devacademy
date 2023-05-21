const fs = require('fs');
const csv = require('csv-parser');
const Journey = require('../models/Journey');

async function importJourneysFromCSV() {
  return new Promise((resolve, reject) => {
    const fileNames = ['2021-05.csv', '2021-06.csv', '2021-07.csv'];
    const importCountLimit = 100000; // Limited to 100 000 journeys per file because of storage restrictions in MongoDB Atlas

    let journeys = [];

    const processFile = (fileName) => {
      return new Promise((resolve, reject) => {
        fs.createReadStream(fileName)
          .pipe(csv({headers: false})) // Targeting by index instead of headers because of undefined headers
          .on('data', (data) => {
            const journey = {
              Departure: String(data[0]),
              Return: String(data[1]),
              'Departure station id': String(data[2]),
              'Departure station name': data[3],
              'Return station id': String(data[4]),
              'Return station name': data[5],
              'Covered distance (m)': Number(data[6]),
              'Duration (sec.)': Number(data[7]),
            };

            if (
              journey['Covered distance (m)'] >= 10 &&
              journey['Duration (sec.)'] >= 10 &&
              journeys.length < importCountLimit
            ) {
              journeys.push(journey);
            }
          })
          .on('end', async () => {
            try {
              await Journey.insertMany(journeys);
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

    const processFiles = async () => {
      for (const fileName of fileNames) {
        await processFile(fileName);
      }
      resolve();
    };

    processFiles();
  });
}

module.exports = { importJourneysFromCSV };