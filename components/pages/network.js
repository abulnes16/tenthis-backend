/* Pages routes module */

//Express
const router = require("express").Router();

//Response
const response = require("../../modules/response");

//Auth middlewares
const { auth, authorize } = require("../../middlewares/auth");

//Validators
const { validationResult } = require("express-validator");
const Validators = require("./validators");

//Controller
const controller = require("./controller");

//Handlers
const ResponseError = require("../../modules/errorResponse");
const asyncHandler = require("../../middlewares/asyncHandler");

/**
 * @route GET /page
 * @description Endpoint for listing pages
 * @access owner
 */
router.get(
  "/",
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const storeId = req.user.store;
    const pages = await controller.getPages(storeId);
    response.success(req, res, pages);
  })
);

/**
 * @route GET /page/:id
 * @description Endpoint for listing a page by id
 * @access owner
 */
router.get(
  "/:id",
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const storeId = req.user.store;
    const page = await controller.getPages(storeId, id);
    response.success(req, res, page[0]);
  })
);


/**
 * @route POST /page
 * @description Endpoint for create a page
 * @access owner
 */
router.post(
  "/",
  Validators,
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new ResponseError("Invalid data", 400, errors.array()));
    }

    const { title, description, isVisible, isMain, html, css } = req.body;
    const storeId = req.user.store;

    const page = await controller.createPage(
      title,
      description,
      storeId,
      isMain,
      isVisible,
      html,
      css
    );

    if (page) {
      response.success(req, res, page, "Page created", 201);
    } else {
      return next(new ResponseError("Failed creating page", 500));
    }
  })
);

/**
 * @route PUT /page/:id
 * @description Endpoint for updating a page by id
 * @access owner
 */
router.put(
  "/:id",
  Validators,
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new ResponseError("Invalid data", 400, errors.array()));
    }
    const { id } = req.params;
    const { title, description, isVisible, isMain, html, css } = req.body;
    const storeId = req.user.store;

    const page = await controller.updatePage(
      id,
      title,
      description,
      storeId,
      isMain,
      isVisible,
      html,
      css
    );

    if (page) {
      response.success(req, res, page, "Page updated");
    } else {
      return next(new ResponseError("Failed updating page", 500));
    }
  })
);

/**
 * @route DELETE /page/:id
 * @description Endpoint for deleting a page by id
 * @access owner
 */
router.delete(
  "/:id",
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const storeId = req.user.store;

    const result = await controller.deletePage(id, storeId);
    if (result) {
      response.success(req, res, null, "Page deleted");
    } else {
      return next(new ResponseError("Falied deleting page", 500));
    }
  })
);

module.exports = router;
