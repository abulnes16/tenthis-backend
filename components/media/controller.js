/* Media controller module */

// Store
const store = require("./store");

//Modules
const { generateFilePath, deleteFile } = require("../../modules/files");
const { getFormatDate } = require("../../modules/date");
const moment = require("moment");

/**
 * Get media controller
 * Get media from database, if id is provided then
 * get the media with current id
 * @param {string} storeId Store id
 * @param {string} id Media id
 */
function getMedia(storeId, id = null) {
  let filter = { store: storeId };
  if (id) {
    filter = { ...filter, _id: id };
  }

  return store.list(filter);
}

/**
 * Get media controller
 * Get an array of media filter by id
 * @param {string} storeId Store id
 * @param {Array<string>} filesIds Array of media ids
 */
function getBulkMedia(storeId, filesIds) {
  const filter = { store: storeId, _id: { $in: [...filesIds] } };
  return store.list(filter);
}

/**
 * Create media controller
 * Create a media reference in database
 * @param {string} storeId Store id
 * @param {string} filename File reference name
 */
async function createMedia(storeId, file) {
  const media = {
    name: file[0].name,
    path: generateFilePath(file[0].name),
    date: moment().format("l"),
    type: file[0].type,
    store: storeId,
  };

  try {
    const m = await store.add(media);

    return m;
  } catch (error) {
    console.log(error);
    return error;
  }
}

/**
 * Delete media controller
 * Delete a media in database an in upload folder
 * @param {string} storeId Store id
 * @param {string} id Media id to be deleted
 */
async function deleteMedia(storeId, id) {
  const filter = { store: storeId, _id: id };

  try {
    const file = await store.list(filter);

    if (file && file.length !== 0) {
      deleteFile(file[0]);
    }

    const result = await store.delete(filter);
    return result.deletedCount > 0 ? true : false;
  } catch (error) {
    return false;
  }
}

module.exports = {
  getMedia,
  getBulkMedia,
  createMedia,
  deleteMedia,
};
