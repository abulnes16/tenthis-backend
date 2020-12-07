/* Page controller module */

// Store
const store = require("./store");

/**
 * Get page controller
 * Get a page from database filter by store
 * @param {string} storeId Store id
 * @param {string} id Page id
 */
function getPages(storeId, id = null) {
  let filter = { store: storeId };
  if (id !== null) {
    filter = { ...filter, _id: id };
  }

  return store.list(filter);
}

/**
 * Create page controller
 * Create a page in database
 * @param {string} title Page title
 * @param {string} description Page description
 * @param {string} storeId Store who created the page
 * @param {boolean} isMain Indicates if the page is Home page or not
 * @param {boolean} isVisible Indicates if the page is visible for the client
 * @param {Array<any>} html Page HTML
 * @param {string} css Page CSS
 */
async function createPage(
  title,
  description,
  storeId,
  isMain,
  isVisible,
  html,
  css
) {
  const page = {
    title,
    description,
    store: storeId,
    isVisible,
    isMain,
    html,
    css,
  };

  try {
    const p = await store.add(page);
    return p;
  } catch (error) {
    return error;
  }
}

/**
 * Update page controller
 * Update a page in database filter by id
 * @param {string} id Page Id
 * @param {string} title Page title
 * @param {string} description Page description
 * @param {string} storeId Store who created the page
 * @param {boolean} isMain Indicates if the page is Home page or not
 * @param {boolean} isVisible Indicates if the page is visible for the client
 * @param {Array<any>} html Page HTML
 * @param {string} css Page CSS
 */
async function updatePage(
  id,
  title,
  description,
  storeId,
  isMain,
  isVisible,
  html,
  css
) {
  const filter = { store: storeId, _id: id };
  const page = {
    title,
    description,
    store: storeId,
    isVisible,
    isMain,
    html,
    css,
  };

  try {
    const p = await store.update(filter, page);
    return p ? page : false;
  } catch (error) {
    return error;
  }
}

/**
 * Delete page controller
 * Delete a page in database
 * @param {string} id Page id
 * @param {string} storeId Store id
 */
async function deletePage(id, storeId) {
  const filter = { store: storeId, _id: id };
  try {
    const result = await store.delete(filter);
    return result.deletedCount > 0 ? true : false;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getPages,
  createPage,
  updatePage,
  deletePage,
};
