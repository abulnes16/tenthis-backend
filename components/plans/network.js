/* Plans routes module */

//Express
const router = require("express").Router();

//Response 
const response = require('../../modules/response');

//Controller
const controller = require('./controller');

router.get("/", async (req, res) => {
  try {
    const plans = await controller.getPlans();
    response.success(req, res, plans);
  }catch(error){
    response.error(req, res, "Internal server error");
  }
});


module.exports = router;