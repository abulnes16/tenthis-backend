/* Files modules */

//Modules
const fs = require("fs");
const { getFormatDate } = require("./date");

/**
 * Function that deletes files in the uploads folder
 * that are in the current data
 * @param {object} data
 */
function deleteFiles(data) {
  if (data.media) {
    data.media.forEach((file) => {
      fs.unlink(`./uploads/${file.name}`, () => {
        console.log("File deleted");
      });
    });
  }

  return true;
}

/**
 * Delete a file from upload folder
 * @param {string} filename The filename
 */
function deleteFile(filename) {
  try {
    fs.unlink(`./uploads/${filename}`, () => {
      console.log("File deleted");
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * Function that generates filepath string
 * @param {string} filename
 */
function generateFilePath(filename) {
  return `${process.env.API_URL}:${process.env.API_PORT}/uploads/${filename}`;
}

/**
 * Function that generates the updated array of files
 * in the objects
 * @param {string} media
 * @param {Array} files
 * @param {Array} filenames
 */
function updateFiles(media, files, filenames) {
  let updatedFiles = [];

  // There are no new files to add
  if (files && files.length === 0) {
    //So update the media with current data
    updatedFiles = JSON.parse(media);
  } else if (media && filenames) {
    //If there new files map the files to json format
    const newFiles = filenames.map((file) => ({
      name: file,
      path: generateFilePath(file),
      date: getFormatDate(),
    }));
    //Parse the previous values
    const previousMedia = JSON.parse(media);
    // And join them together
    updatedFiles = [...previousMedia, ...newFiles];
  }

  return updatedFiles;
}

module.exports = {
  deleteFiles,
  deleteFile,
  generateFilePath,
  updateFiles,
};
