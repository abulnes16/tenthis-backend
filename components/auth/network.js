/* Auth routes module */
//Express
const router = require("express").Router();

//Controller
const controller = require("./controller");

//Response
const response = require("../../modules/response");

//Middlewares
const asyncHandler = require("../../middlewares/asyncHandler");
const ResponseError = require("../../modules/errorResponse");

//Validators
const { registerValidators, loginValidators } = require("./validators");
const { validationResult } = require("express-validator");


/**
 * @route POST /auth/register
 * @description Endpoint for create an user in the system
 * @access public
 */
router.post(
  "/register",
  registerValidators,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ResponseError("Invalid data", 400, errors.array()));
    }

    const user = await controller.register(req.body);
    response.success(req, res, user, "User created", 201);
  })
);

/**
 * @route POST /auth/login
 * @description Endpoint for login
 * @access public
 */
router.post(
  "/login",
  loginValidators,
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ResponseError("Invalid user or password", 400));
    }

    const { email, password } = req.body;
    const data = await controller.login(email, password);
    response.success(req, res, data, "Login successfully");
  })
);

module.exports = router;
