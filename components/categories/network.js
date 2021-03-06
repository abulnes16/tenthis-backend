/* Categories routes module */

//Express
const router = require("express").Router();

//Response
const response = require("../../modules/response");

//Auth middlewares
const { auth, authorize } = require("../../middlewares/auth");


//Validators
const { validationResult } = require("express-validator");
const Validator = require("./validators");

//Controller
const controller = require("./controller");

//Handlers
const ResponseError = require("../../modules/errorResponse");
const asyncHandler = require("../../middlewares/asyncHandler");

/**
 * @route GET /category
 * @description Endpoint for listing categories
 * @access owner
 */
router.get(
  "/",
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const storeId = req.user.store;
    const categories = await controller.getCategories(storeId);
    response.success(req, res, categories);
  })
);

/**
 * @route GET /category/:id
 * @description Endpoint for listing a category based in id
 * @access owner
 */
router.get(
  "/:id",
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const storeId = req.user.store;
    const { id } = req.params;
    const category = await controller.getCategories(storeId, id);
    if (category[0]) {
      response.success(req, res, category[0]);
    } else {
      return next(new ResponseError("Category not found", 404));
    }
  })
);


/**
 * @route POST /category
 * @description Endpoint for creating categories
 * @access owner
 */
router.post(
  "/",
  Validator,
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ResponseError("Invalid data", 400, errors.array()));
    }
    const { name, description } = req.body;
    const storeId = req.user.store;
    const category = await controller.createCategory(
      name,
      description,
      storeId
    );

    response.success(req, res, category, "Category created", 201);
  })
);


/**
 * @route PUT /category/:id
 * @description Endpoint for updating categories by id
 * @access owner
 */
router.put(
  "/:id",
  Validator,
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ResponseError("Invalid data", 400, errors.array()));
    }

    const { name, description } = req.body;
    const storeId = req.user.store;
    const { id } = req.params;

    const category = await controller.updateCategory(
      id,
      name,
      description,
      storeId
    );

    if (category) {
      response.success(req, res, category, "Category updated");
    } else {
      return next(new ResponseError("Category not found", 404));
    }
  })
);


/**
 * @route DELETE /category/:id
 * @description Endpoint for deleting categories by id
 * @access owner
 */
router.delete(
  "/:id",
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const storeId = req.user.store;

    const result = await controller.deleteCategory(id, storeId);
    if (result) {
      response.success(req, res, result, "Category deleted");
    } else {
      return next(new ResponseError("Category not found", 404));
    }
  })
);
module.exports = router;
