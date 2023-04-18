/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('needle');
const readline = require('readline');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  const readStream = fs.createReadStream(filePath);

  readStream
    .on('error', (err) => {
      callback(err);
    })
    .on('ready', () => {
      let lineReader = readline.createInterface({
        input: readStream,
      });
      lineReader.on('line', (line) => {
        lineReader.close();
        lineReader.removeAllListeners();
        callback(null, line);
      });
    });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  // TODO
  request.get(url, (err, response) => {
    if (err) {
      callback(err);
    } else {
      callback(null, response.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile,
};
