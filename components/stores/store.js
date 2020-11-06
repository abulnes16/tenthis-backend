/* Stores store module */

//Model
const Model = require("../../models/stores");

/**
 * Get stores from database
 * @param {object} filter Query filter
 */
function getStores(filter) {
  return Model.find(filter).populate("user").exec();
}


module.exports = {
  list: getStores,
}