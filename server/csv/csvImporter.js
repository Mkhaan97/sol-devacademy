const fs = require('fs');
const csv = require('csv-parser');
const Journey = require('../models/Journey');

// CSV import, reads every line and imports the journey to MongoDB if it's longer than 10 seconds and 10 m.
async function importDataFromCSV() {
  return new Promise((resolve, reject) => {
    const fileNames = ['2021-05.csv', '2021-06.csv', '2021-07.csv']; // Update with your desired file names
    const importCountLimit = 1000; // Number of documents to import from each file

    var importCount = 0; // Counter variable

    const processFile = (fileName) => {
      return new Promise((resolve, reject) => {
        fs.createReadStream(fileName)
          .pipe(csv())
          .on('data', async (data) => {
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
              importCount < importCountLimit
            ) {
              try {
                const newJourney = new Journey(journey);
                await newJourney.save();
                importCount++;
              } catch (error) {
                console.log('Failed to save error', error);
              }
            }
          })
          .on('end', () => {
            console.log('Import complete for', fileName);
            resolve();
          })
          .on('error', (error) => {
            console.log('Failed to parse document', error);
            reject(error);
          });
      });
    };

    // Process each file
    const processFiles = async () => {
      for (const fileName of fileNames) {
        await processFile(fileName);
      }
      resolve();
    };

    processFiles();
  });
}




module.exports = { importDataFromCSV};
