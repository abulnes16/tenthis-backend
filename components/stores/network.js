/* Store router module */

//Express
const router = require("express").Router();

//Response
const response = require("../../modules/response");

//Multer
const upload = require("../../modules/fileUpload");

//Auth middlewares
const { auth, authorize } = require("../../middlewares/auth");
const asyncHandler = require("../../middlewares/asyncHandler");

//Validators
const { validationResult } = require("express-validator");
const { blockValidator, configValidator } = require("./validators");

//Controller
const controller = require("./controller");
const ResponseError = require("../../modules/errorResponse");

/**
 * @route GET /store
 * @description Endpoint for listing stores
 * @access admin
 */
router.get(
  "/",
  auth,
  authorize(["admin", "client"]),
  asyncHandler(async (req, res, next) => {
    const user = req.user;
    const stores = await controller.getStores(user);
    response.success(req, res, stores);
  })
);

/**
 * @route GET /store/:id
 * @description Endpoint for get a store by id
 * @access admin, owner
 */
router.get(
  "/:id",
  auth,
  authorize(["admin", "owner", "client"]),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;
    const store = await controller.getStores(user, id);
    response.success(req, res, store[0]);
  })
);

/**
 * @route PATCH /store/:id/block
 * @query {boolean} unblock Flag that indicates if the store is going to be unlock
 * @description Endpoint for block a store by id
 * @access admin
 */
router.patch(
  "/:id/block",
  blockValidator,
  auth,
  authorize(["admin"]),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ResponseError("Invalid query", 400, errors.array()));
    }

    const { unblock } = req.query;
    const { id } = req.params;

    let flag = unblock ? true : false;
    let message = flag ? "unblock" : "block";

    const blockStore = await controller.blockStore(id, flag);

    if (blockStore.length === 0) {
      return next(new ResponseError("Store not found", 404));
    }
    response.success(req, res, blockStore[0], `Store ${message} successfully`);
  })
);

/**
 * @route PATCH /store/:id/config
 * @description Endpoint for update the config in a store by id
 * @access owner
 */
router.patch(
  "/:id/config",
  upload.fields([{ name: "faviconImg" }, { name: "logoImg" }]),
  configValidator,
  auth,
  authorize(["owner"]),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const {
      name,
      description,
      logo,
      favicon,
      keywords,
      header,
      footer,
      js,
      css,
      useTemplate,
      template,
    } = req.body;

    const filenames = req.filenames;
    const files = req.files;

    const store = await controller.updateConfiguration(
      id,
      name,
      description,
      logo,
      favicon,
      keywords,
      css,
      js,
      header,
      footer,
      useTemplate,
      template,
      filenames,
      files
    );
    response.success(req, res, store, "Store configuartion updated");
  })
);

/**
 * @route DELETE /store/:id
 * @description Endpoint for deleting a store by id
 * @access admin
 */
router.delete(
  "/:id",
  auth,
  authorize(["admin"]),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedStore = await controller.deleteStore(id);

    if (deletedStore.deletedCount === 0) {
      return next(new ResponseError("Store not found", 404));
    }
    response.success(req, res, null, "Store deleted");
  })
);

module.exports = router;
