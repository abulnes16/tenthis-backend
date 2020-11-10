/* Stores store module */

//Model
const Model = require("../../models/stores");
const ResponseError = require("../../modules/errorResponse");

/**
 * Get stores from database
 * @param {object} filter Query filter
 */
function getStores(filter) {
  return Model.find(filter).populate("user").exec();
}

/**
 * Block the current filter store
 * @param {object} filter Store filter, contains the id
 * @param {object} data Store data to be updated (isBlock, isActive)
 */
async function blockStore(filter, data) {
  try {
    await Model.findOneAndUpdate(filter, data);
    return getStores(filter);
  } catch (error) {
    throw new ResponseError("Internal server error");
  }
}

/**
 * Delete the current filter store
 * @param {object} filter Store filter, contains the id.
 */
function deleteStore(filter) {
  return Model.deleteOne(filter);
}

module.exports = {
  list: getStores,
  block: blockStore,
  delete: deleteStore,
};
