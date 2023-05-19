
const fs = require('fs');
const csv = require('csv-parser');
const Journey = require('../models/Journey');

async function importJourneysFromCSV() {
  return new Promise((resolve, reject) => {
    const fileNames = ['2021-05.csv', '2021-06.csv', '2021-07.csv']; // Update with your desired file names
    const importCountLimit = 100000; // Limited to 100 000 journeys per file because of storage issues in MongoDB Atlas 

    let journeys = []; // Array to store the journeys

    const processFile = (fileName) => {
      return new Promise((resolve, reject) => {
        fs.createReadStream(fileName)
          .pipe(csv())
          .on('data', (data) => {
            const journey = {
              Departure: String(data.Departure),
              Return: String(data.Return),
              'Departure station id': String(data['Departure station id']),
              'Departure station name': data['Departure station name'],
              'Return station id': String(data['Return station id']),
              'Return station name': data['Return station name'],
              'Covered distance (m)': Number(data['Covered distance (m)']),
              'Duration (sec.)': Number(data['Duration (sec.)']),
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
              await Journey.insertMany(journeys); // Insert all the journeys at once
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