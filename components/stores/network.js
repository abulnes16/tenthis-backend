/* Store router module */

//Express
const router = require("express").Router();

//Response
const response = require("../../modules/response");

//Auth middlewares
const { auth, authorize } = require("../../middlewares/auth");
const asyncHandler = require("../../middlewares/asyncHandler");

//Controller
const controller = require("./controller");

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

module.exports = router;
