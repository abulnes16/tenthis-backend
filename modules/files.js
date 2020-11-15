/* Files modules */

const fs = require("fs");

/**
 * Function that deletes files in the uploads folder
 * that are in the current data
 * @param {object} data
 */
function deleteFiles(data) {
  data.media.forEach((file) => {
    fs.unlink(`./uploads/${file.name}`, () => {
      console.log("File deleted");
    });
  });

  return true;
}

module.exports = {
  deleteFiles,
};
