/* Stores store module */

//Model
const Model = require("../../models/stores");
const ResponseError = require("../../modules/errorResponse");

/**
 * Get stores from database
 * @param {object} filter Query filter
 */
function getStores(filter) {
  const populatePlan = {
    path: "user",
    populate: { path: "plan", select: ["name", "numTemplates"] },
  };
  return Model.find(filter).populate("user").populate(populatePlan).exec();
}

/**
 * Create a store in database
 * @param {object} data Store data
 */
async function createStore(data) {
  try {
    const s = new Model(data);
    await s.save();
    return s;
  } catch (error) {
    return error;
  }
}

/**
 * Patch the current filter store data
 * @param {object} filter Store filter, contains the id
 * @param {object} data Store data to be updated
 */
async function patchStore(filter, data) {
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
  add: createStore,
  patch: patchStore,
  delete: deleteStore,
};
