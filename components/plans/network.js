/* Plans routes module */
require("colors");
//Express
const router = require("express").Router();

//Response
const response = require("../../modules/response");
//Validators
const { validationResult } = require("express-validator");
const { createValidators, updateValidators } = require("./validators");

//Controller
const controller = require("./controller");
const ResponseError = require("../../modules/errorResponse");
const asyncHandler = require("../../middlewares/asyncHandler");

/**
 * @route GET /plan/
 * @description Endpoint for get plans
 * @access admin
 */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const plans = await controller.getPlans();
    response.success(req, res, plans);
  })
);

/**
 * @route GET /plan/:id
 * @description Endpoint for get a plan by id
 * @access admin
 */
router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const plans = await controller.getPlans(id);
    response.success(req, res, plans);
  })
);

/**
 * @route POST /plan/
 * @description Endpoint for creating a plan
 * @access admin
 */
router.post(
  "/",
  createValidators,
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

/**
 * @route PUT /plan/:id
 * @description Endpoit for updating a plan
 * @access admin
 */
router.put(
  "/:id",
  updateValidators,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new ResponseError("Invalid data", 400, errors.array()));
    }
    const { id } = req.params;
    const { name, price, storage, pages, products, templates } = req.body;
    const result = await controller.updatePlan(
      id,
      name,
      price,
      storage,
      pages,
      products,
      templates
    );
    response.success(req, res, result);
  })
);

/**
 * @route DELETE /plan/:id
 * @description Endpoint for deleting a plan
 * @access admin
 */
router.delete(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const result = await controller.deletePlan(id);
    if (result) {
      let message = { message: "Plan deleted", status: "OK" };
      response.success(req, res, message);
    }else {
      return next(new ResponseError("Plan not found",404,""));
    }
  })
);

module.exports = router;
