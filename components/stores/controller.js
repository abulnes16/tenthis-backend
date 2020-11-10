/* Store controller module */

//Store
const store = require("./store");

/**
 * Store controller, get the store
 * @param {string} id Store id
 */
function getStores(id = null) {
  let filter = {};
  if (id !== null) {
    filter = { _id: id };
  }

  return store.list(filter);
}

/**
 * Block store controller, set the
 * isBlock to true and isActive to false to
 * block the current store
 * @param {string} id  Store id
 */
function blockStore(id) {
  let filter = { _id: id };
  let data = { $set: { isBlock: true, isActive: false } };
  return store.block(filter, data);
}

/**
 * Delete store controller, deletes a store
 * by id
 * @param {string} id Store id
 */
function deleteStore(id) {
  let filter = { _id: id };
  return store.delete(filter);
}

module.exports = {
  getStores,
  blockStore,
  deleteStore,
};
