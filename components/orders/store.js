/* Order store module */

const Model = require("../../models/orders");

/**
 * Get orders from database
 * @param {Object} filter Order filter
 */
function getOrders(filter) {
  return Model.find(filter).populate("client").populate("store").exec();
}

/**
 * Create an order in database
 * @param {Object} data Order data
 */
async function createOrder(data) {
  try {
    const order = new Model(data);
    await order.save();
    return order;
  } catch (error) {
    return error;
  }
}

module.exports = {
  list: getOrders,
  add: createOrder,
};
