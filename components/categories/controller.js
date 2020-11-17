/* Category controller module */

// Store
const store = require("./store");

/**
 * Get categories controller
 * Get categories from database, if id is provided
 * filter the current category
 * @param {string} id Category id
 * @param {string} storeId Store id
 */
function getCategories(storeId, id = null) {
  let filter = { store: storeId };
  if (id !== null) {
    filter = { ...filter, _id: id };
  }
  return store.list(filter);
}

/**
 * Create category controller
 * Create a category in database
 * @param {string} name Category name
 * @param {string} description Category description
 */
async function createCategory(name, description, storeId) {
  const category = {
    name,
    description,
    store: storeId,
  };

  try {
    const cat = await store.add(category);
    return cat;
  } catch (error) {
    return error;
  }
}

/**
 * Update category controller
 * Update a category in database filter by id
 * @param {string} id Category id
 * @param {string} name Category name
 * @param {string} description Category description
 */
async function updateCategory(id, name, description, storeId) {
  const category = { name, description };
  const filter = { _id: id, store: storeId };
  try {
    const cat = await store.update(filter, category);
    return cat ? category : false;
  } catch (error) {
    return error;
  }
}

/**
 * Delete category controller
 * Delete a category in database filter by id
 * @param {string} id Category id
 */
async function deleteCategory(id, storeId) {
  let filter = { _id: id, store: storeId };
  try {
    const result = await store.delete(filter);
    return result ? true : false;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
