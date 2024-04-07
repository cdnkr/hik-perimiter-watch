const fs = require("fs");
const path = require("path");

function ensureDirectoryExistence(dirPath) {
  return new Promise((resolve, reject) => {
    // Convert to absolute path
    const absolutePath = path.resolve(dirPath);

    fs.mkdir(absolutePath, { recursive: true }, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
    ensureDirectoryExistence
}