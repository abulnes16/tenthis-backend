/* Plans controller module */

//Modules
const store = require("./store");

/**
 * Get plans controller
 */
function getPlans(id = null) {
  return store.list(id);
}

/**
 * Create plan controller
 * @param {string} name Plan name
 * @param {number} price Plan price
 * @param {number} storage Plan storage capacity
 * @param {number} pages Plan max pages
 * @param {number} products Plan max products
 * @param {number} templates Plan max templates
 */
async function createPlan(name, price, storage, pages, products, templates) {
  try {
    let plan = {
      name,
      price,
      storage,
      numPages: pages,
      numProducts: products,
      numTemplates: templates,
    };

    await store.add(plan);
    return plan;
  } catch (error) {
    return error;
  }
}

/**
 * Update plan controller
 * @param {string} id Plan id
 * @param {string} name Plan name
 * @param {number} price Plan price
 * @param {number} storage Plan storage capacity
 * @param {number} pages Plan max pages
 * @param {number} products Plan max products
 * @param {number} templates Plan max templates
 */
async function updatePlan(
  id,
  name,
  price,
  storage,
  pages,
  products,
  templates
) {
  try {
    let plan = {
      name,
      price,
      storage,
      numPages: pages,
      numProducts: products,
      numTemplates: templates,
    };
    let filter = { _id: id };
    await store.update(filter, plan);
    return plan;
  } catch (error) {
    return error;
  }
}

/**
 * Delete plan controller
 * @param {string} id Plan id
 */
async function deletePlan(id) {
  try {
    let filter = { _id: id };
    const result = await store.delete(filter);
    return result.deletedCount > 0 ? true : false;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
};
