/* User store module */

//Model
const Model = require("../../models/users");

/**
 * Get users from database
 * @param {object} filter Filter for search the user
 */
function listUser(filter) {
  return Model.find(filter).populate("plan").exec();
}

/**
 * Update an user
 * @param {object} filter Filter for update the specific user
 * @param {object} data The data to be updated
 */
function updateUser(filter, data) {
  return Model.updateOne(filter, data);
}

/**
 * Delete an user
 * @param {object} filter Filter for delete the user
 */
function deleteUser(filter) {
  return Model.deleteOne(filter);
}

module.exports = {
  list: listUser,
  update: updateUser,
  delete: deleteUser,
};
