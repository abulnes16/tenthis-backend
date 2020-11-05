/* User routes module */

//Express
const router = require("express").Router();

//Controller
const controller = require("./controller");

//Response
const response = require("../../modules/response");

//Validators
const { validationResult } = require("express-validator");
const { updateValidator } = require("./validators");

//Handlers
const ResponseError = require("../../modules/errorResponse");
const asyncHandler = require("../../middlewares/asyncHandler");

//Auth middlewares
const { auth, authorize } = require("../../middlewares/auth");

/**
 * @route GET /user/
 * @description Endpoint for get users
 * @access admin
 */
router.get(
  "/",
  auth,
  authorize("admin"),
  asyncHandler(async (req, res, next) => {
    const users = await controller.getUsers();
    response.success(req, res, users);
  })
);

router.get(
  "/:id",
  auth,
  authorize("admin"),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await controller.getUsers(id);
    if (user.length === 0) {
      return next(new ResponseError("User not found", 404));
    }
    response.success(req, res, user[0]);
  })
);

router.put(
  "/:id",
  updateValidator,
  auth,
  authorize("admin"),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new ResponseError("Invalid data", 400, errors.array()));
    }
    const { id } = req.params;
    const { name, email, role, plan } = req.body;
    const result = await controller.updateUser(id, name, email, plan, role);
    response.success(req, res, result, "User updated");
  })
);

module.exports = router;
