/* Permissions middlewares module */

//Models
const StoreModel = require("../models/stores");
const ResponseError = require("../modules/errorResponse");

//Response
const response = require("../modules/response");

/**
 * Middleware that check if the current user is
 * owner of the store
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function isOwner(req, res, next) {
  const user = req.user;
  try {
    const store = await StoreModel.findOne({ user: user.id, _id: user.store });
    if (store) {
      req.storeId = store._id;
      next();
    } else {
      return response.error(
        req,
        res,
        "User is not owner of this store",
        "Invalid token",
        403
      );
    }
  } catch (error) {
    console.log(error);
    return next(new ResponseError("Internal server error", 500));
  }
}

module.exports = {
  isOwner,
};
