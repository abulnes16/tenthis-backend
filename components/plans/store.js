/* Plan store module */

const Model = require('../../models/plans');

async function getPlans(){
  try {
    const plans =  await Model.find();
    return plans;
  }catch(error){
    return error;
  }
}


module.exports = {
  list: getPlans,
}