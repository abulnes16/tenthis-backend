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

module.exports = {
  getStores,
}
