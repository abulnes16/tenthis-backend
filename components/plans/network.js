/* Plans routes module */
require("colors");
//Express
const router = require("express").Router();

//Response
const response = require("../../modules/response");
//Validators
const { validationResult } = require("express-validator");
const planValidators = require("./validators");
//Controller
const controller = require("./controller");
const ResponseError = require("../../modules/errorResponse");
const asyncHandler = require("../../middlewares/asyncHandler");

/**
 * @route GET /plans/
 * @description Endpoint for get plans
 * @access admin
 */
router.get("/", async (req, res) => {
  try {
    const plans = await controller.getPlans();
    response.success(req, res, plans);
  } catch (error) {
    response.error(req, res, "Internal server error");
  }
});

router.post(
  "/",
  planValidators,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new ResponseError("Invalid data", 400, errors.array()));
    }

    const { name, price, storage, pages, products, templates } = req.body;

    const result = await controller.createPlan(
      name,
      price,
      storage,
      pages,
      products,
      templates
    );
    response.success(req, res, result, 201);
  })
);

module.exports = router;
