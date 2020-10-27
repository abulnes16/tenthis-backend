/* Plans controller module */

//Modules
const store = require("./store");

/**
 * Get plans controller
 */
function getPlans() {
  return store.list();
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

module.exports = {
  getPlans,
  createPlan,
};
