/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('needle');
var Promise = require('bluebird');
const readline = require('readline');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function (filePath) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);

    readStream
      .on('error', (err) => {
        reject(err);
      })
      .on('ready', () => {
        let lineReader = readline.createInterface({
          input: readStream,
        });
        lineReader.on('line', (line) => {
          lineReader.close();
          lineReader.removeAllListeners();
          resolve(line);
        });
      });
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function (url) {
  return new Promise((resolve, reject) => {
    request.get(url, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.statusCode);
      }
    });
  });
};

// var getStatusCodeAsync2 = async (url) => await getStatusCodeAsync(url);

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync,
};
