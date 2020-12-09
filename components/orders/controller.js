/* Order controller module */

// Module
const moment = require("moment");

//Store
const store = require("./store");

/**
 * Get orders controller
 * Get order controller from database
 * @param {Object} user User who make the request
 * @param {string} id Order id
 */
function getOrders(user, id = null) {
  let filter = {};

  if (user.role !== "client") {
    filter = { store: user.store };
  } else {
    filter = { client: user.id };
  }

  if (id) {
    filter = { ...filter, _id: id };
  }

  return store.list(filter);
}

/**
 * Create order controller
 * Create an order in database
 * @param {string} client Client that make the order
 * @param {string} storeId Store which order is make
 * @param {Array} products Order products
 */
async function createOrder(client, storeId, products) {
  const total = products.reduce(
    (subtotal, product) => (subtotal += product.quantity * product.price),
    0
  );

  const date = moment().format("l");

  const order = {
    client,
    store: storeId,
    date,
    total,
    products,
  };

  return store.add(order);
}

module.exports = {
  getOrders,
  createOrder,
};
