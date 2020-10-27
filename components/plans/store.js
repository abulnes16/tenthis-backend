/* Plan store module */

const Model = require('../../models/plans');

/**
 * Get plans from database
 */
async function getPlans(){
  try {
    const plans =  await Model.find();
    return plans;
  }catch(error){
    return error;
  }
}

/**
 * Create a plan and save it in database
 * @param {object} plan 
 */
async function savePlan(data){
  const plan = new Model(data);
  plan.save();
}


module.exports = {
  list: getPlans,
  add: savePlan,
}