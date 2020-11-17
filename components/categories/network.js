/* Categories routes module */

//Express
const router = require("express").Router();

//Response
const response = require("../../modules/response");

//Auth middlewares
const { auth, authorize } = require("../../middlewares/auth");

//Permissions
const { isOwner } = require("../../middlewares/permissions");

//Validators
const { validationResult } = require("express-validator");
const { Validator } = require("./validators");

//Controller
const controller = require("./controller");

//Handlers
const ResponseError = require("../../modules/errorResponse");
const asyncHandler = require("../../middlewares/asyncHandler");
const Validators = require("./validators");

router.get(
  "/",
  auth,
  authorize(["owner"]),
  isOwner,
  asyncHandler(async (req, res, next) => {
    const storeId = req.storeId;
    const categories = await controller.getCategories(storeId);
    response.success(req, res, categories);
  })
);

router.get(
  "/:id",
  auth,
  authorize(["owner"]),
  isOwner,
  asyncHandler(async (req, res, next) => {
    const storeId = req.storeId;
    const { id } = req.params;
    const category = await controller.getCategories(storeId, id);
    if (category[0]) {
      response.success(req, res, category[0]);
    }else {
      return next(new ResponseError('Category not found', 404));
    }
  })
);

router.post(
  "/",
  Validators,
  auth,
  authorize(["owner"]),
  isOwner,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ResponseError("Invalid data", 400, errors.array()));
    }
    const { name, description } = req.body;
    const storeId = req.storeId;
    const category = await controller.createCategory(
      name,
      description,
      storeId
    );

    response.success(req, res, category, "Category created", 201);
  })
);

router.put(
  "/:id",
  Validators,
  auth,
  authorize(["owner"]),
  isOwner,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ResponseError("Invalid data", 400, errors.array()));
    }

    const { name, description } = req.body;
    const storeId = req.storeId;
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

router.delete(
  "/:id",
  auth,
  authorize(["owner"]),
  isOwner,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const storeId = req.storeId;

    const result = await controller.deleteCategory(id, storeId);
    if (result) {
      response.success(req, res, result, "Category deleted");
    } else {
      return next(new ResponseError("Category not found", 404));
    }
  })
);
module.exports = router;
