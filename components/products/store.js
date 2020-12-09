/* Product store module */

//Model
const Model = require("../../models/products");

/**
 * Get productos from database
 * @param {object} filter Product filter
 */
function getProducts(filter) {
  return Model.find(filter);
}

/**
 * Create a product in database
 * @param {object} data Product data
 */
async function createProduct(data) {
  try {
    const p = new Model(data);
    await p.save();
    return p;
  } catch (error) {
    return error;
  }
}

/**
 * Update a product in database
 * @param {object} filter Product filter
 * @param {*} data Product data to be updated
 */
function updateProduct(filter, data) {
  try {
    return Model.findOneAndUpdate(filter, data);
  } catch (error) {
    return error;
  }
}

/**
 * Delete a product in database
 * @param {object} filter Product filter to be deleted
 */
function deleteProduct(filter) {
  return Model.deleteOne(filter);
}

module.exports = {
  add: createProduct,
  list: getProducts,
  update: updateProduct,
  delete: deleteProduct,
};
