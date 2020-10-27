/* Plans controller module */

//Modules
const store = require('./store');

function getPlans(){
  return store.list();
}


module.exports = {
  getPlans,
}