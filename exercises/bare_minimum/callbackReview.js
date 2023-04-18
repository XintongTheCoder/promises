/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('needle');
const readline = require('readline');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // fs.exists(filePath, (exists) => {
  //   let err = new Error('File does not exist');
  //   err.code = 'ENOENT';
  //   if (!exists) {
  //     callback(err);
  //   } else {
  //     let lineReader = readline.createInterface({
  //       input: fs.createReadStream(filePath),
  //     });
  //     let lineNo = 0;
  //     lineReader.on('line', (line) => {
  //       lineNo++;
  //       callback(null, line);
  //       if (lineNo === 1) {
  //         lineReader.close();
  //         lineReader.removeAllListeners();
  //       }
  //     });
  //   }
  // });
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
var getStatusCode = function (url) {
  // TODO
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile,
};
