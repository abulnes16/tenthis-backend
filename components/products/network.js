/* Product network module */

//Express
const router = require("express").Router();
//Multer
const upload = require("../../modules/fileUpload");

//Response
const response = require("../../modules/response");

//Auth middlewares
const { auth, authorize } = require("../../middlewares/auth");

//Validators
const { validationResult } = require("express-validator");
const { Validators } = require("./validators");

//Controller
const controller = require("./controller");

//Handlers
const ResponseError = require("../../modules/errorResponse");
const asyncHandler = require("../../middlewares/asyncHandler");
const Validator = require("./validators");

router.get(
  "/",
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const storeId = req.user.store;
    const products = await controller.getProducts(storeId);
    response.success(req, res, products);
  })
);

router.get(
  "/:id",
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const storeId = req.user.store;
    const { id } = req.params;
    const products = await controller.getProducts(storeId, id);
    response.success(req, res, products[0]);
  })
);

router.post(
  "/",
  upload.array("media"),
  Validator,
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ResponseError("Invalid data", 404, errors.array()));
    }

    const storeId = req.user.store;
    const { name, description, price, category, quantity, tags } = req.body;
    const media = req.files;
    const filenames = req.filenames;

    const product = await controller.createProduct(
      name,
      description,
      price,
      category,
      quantity,
      tags,
      media,
      filenames,
      storeId
    );

    response.success(req, res, product, "Product created", 201);
  })
);

router.put(
  "/:id",
  upload.array("files"),
  Validator,
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ResponseError("Invalid data", 404, errors.array()));
    }

    const storeId = req.user.store;
    const { id } = req.params;
    const {
      name,
      description,
      price,
      category,
      quantity,
      tags,
      media,
    } = req.body;
    const files = req.files;
    const filenames = req.filenames;

    const result = await controller.updateProduct(
      id,
      name,
      description,
      price,
      category,
      quantity,
      tags,
      media,
      files,
      filenames,
      storeId
    );

    if (result) {
      response.success(req, res, result, "Product updated");
    } else {
      return next(new ResponseError("Product not found", 404));
    }
  })
);

router.delete(
  "/:id",
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const result = await controller.deleteProduct(id);
    if (result) {
      response.success(req, res, null, "Product deleted");
    } else {
      return next(new ResponseError("Product not found", 404));
    }
  })
);

module.exports = router;
