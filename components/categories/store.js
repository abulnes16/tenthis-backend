/* Categories store module */

//Model
const Model = require("../../models/categories");

/**
 * Get categories from database
 * @param {object} filter Filter that contains the id of the category
 */
function getCategories(filter) {
  return Model.find(filter).select("-store");
}

/**
 * Create a category in database
 * @param {object} data Category data
 */
async function createCategory(data) {
  try {
    const category = new Model(data);
    await category.save();
    return category;
  } catch (error) {
    return error;
  }
}

/**
 * Update a category in database
 * @param {object} filter The category to be updated
 * @param {object} data Category data
 */
async function updateCategory(filter, data) {
  try {
    const category = await Model.findOneAndUpdate(filter, data);
    return category;
  } catch (error) {
    return error;
  }
}

/**
 * Delete a category in databsse
 * @param {object} filter The category to be deleted
 */
function deleteCategory(filter) {
  return Model.deleteOne(filter);
}

module.exports = {
  add: createCategory,
  list: getCategories,
  update: updateCategory,
  delete: deleteCategory,
};
