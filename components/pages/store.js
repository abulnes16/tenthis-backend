/* Page store module */

// Model
const Model = require("../../models/pages");

/**
 * Get pages from database
 * @param {object} filter Page filter
 */
function getPages(filter) {
  return Model.find(filter).select("-store");
}

/**
 * Create a page in database
 * @param {object} data Page data
 */
async function createPage(data) {
  try {
    const page = new Model(data);
    await page.save();
    return page;
  } catch (error) {
    return error;
  }
}

/**
 * Update a page in database
 * @param {object} filter Page filter
 * @param {*} data Page data 
 */
async function updatePage(filter, data) {
  try {
    const page = await Model.findOneAndUpdate(filter, data);
    return page;
  } catch (error) {
    return error;
  }
}

/**
 * Delete a page in database
 * @param {object} filter Page filter
 */
function deletePage(filter) {
  return Model.deleteOne(filter);
}

module.exports = {
  add: createPage,
  list: getPages,
  update: updatePage,
  delete: deletePage,
};
