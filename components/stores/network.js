/* Store router module */

//Express
const router = require("express").Router();

//Response
const response = require("../../modules/response");

//Auth middlewares
const { auth, authorize } = require("../../middlewares/auth");
const asyncHandler = require("../../middlewares/asyncHandler");

//Validators
const { validationResult } = require("express-validator");
const { blockValidator } = require("./validators");

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
  authorize(["admin"]),
  asyncHandler(async (req, res, next) => {
    const stores = await controller.getStores();
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
  authorize(["admin", "owner"]),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const stores = await controller.getStores(id);
    response.success(req, res, stores);
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
    response.success(req, res, blockStore, `Store ${message} successfully`);
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
