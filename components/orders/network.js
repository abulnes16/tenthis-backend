/* Orders routes module */

//Express
const router = require("express").Router();

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

router.get(
  "/",
  auth,
  authorize(["owner", "client"]),
  asyncHandler(async (req, res, next) => {
    const user = req.user;
    const orders = await controller.getOrders(user);
    response.success(req, res, orders);
  })
);

router.get(
  "/:id",
  auth,
  authorize(["owner", "client"]),
  asyncHandler(async (req, res, next) => {
    const user = req.user;
    const { id } = req.params;
    const order = await controller.getOrders(user, id);
    response.success(req, res, order[0]);
  })
);

router.post(
  "/",
  Validators,
  auth,
  authorize(["client"]),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new ResponseError("Invalid data", 400, errors.array()));
    }

    const clientId = req.user.id;
    const { store, products } = req.body;

    const order = await controller.createOrder(clientId, store, products);

    response.success(req, res, order, "Order created", 201);
  })
);

module.exports = router;
