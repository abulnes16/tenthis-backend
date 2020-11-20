/* Media store module */

// Model
const Model = require("../../models/media");

/**
 * Get media from database
 * @param {Object} filter Media filter
 */
function getMedia(filter) {
  return Model.find(filter);
}

/**
 * Create a media reference in database
 * @param {Object} data Media reference data
 */
async function createMedia(data) {
  try {
    const m = new Model(data);
    await m.save();
    return m;
  } catch (error) {
    return error;
  }
}

/**
 * Delete a media reference in database
 * @param {Object} filter Media filter
 */
function deleteMedia(filter) {
  return Model.deleteOne(filter);
}

module.exports = {
  add: createMedia,
  list: getMedia,
  delete: deleteMedia,
};
