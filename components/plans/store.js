/* Plan store module */

//Model
const Model = require("../../models/plans");

/**
 * Get plans from database
 */
async function getPlan(filter) {
  try {
    const plans = await Model.find(filter);
    return plans;
  } catch (error) {
    return error;
  }
}

/**
 * Create a plan and save it in database
 * @param {object} plan The plan that it's created
 */
async function savePlan(data) {
  const plan = new Model(data);
  await plan.save();
  return plan;
}

/**
 * Update a plan in the database
 * @param {object} filter Filter that contains the id of the plan
 * @param {object} data The plan data that it's going to be updated
 */
async function updatePlan(filter, data) {
  const plan = await Model.findOneAndUpdate(filter, data);
  return plan;
}

/**
 * Delete a plan in the database
 * @param {object} filter Filter that contains the id of the plan
 */
async function deletePlan(filter) {
  const deletePlan = await Model.deleteOne(filter);
  return deletePlan;
}

module.exports = {
  list: getPlan,
  add: savePlan,
  update: updatePlan,
  delete: deletePlan,
};
