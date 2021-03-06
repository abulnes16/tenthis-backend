/* Authorization module */

// Response
const response = require("../modules/response");

//JWT
const jwt = require("jsonwebtoken");
const { getToken } = require("../modules/jwt");

/**
 * Auth middleware for decode the token
 * provided by the user
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function auth(req, res, next) {
  const secret = process.env.JWT_SECRET;
  const token = getToken(req.headers.authorization);
  const decoded = jwt.decode(token, secret);

  const user = {
    id: decoded.id,
    role: decoded.role,
    store: decoded.store,
  };

  req.user = user;

  next();
}

/**
 * Authorize middleware, enables
 * who can use the resource
 * @param {string} role
 */
function authorize(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return response.error(
        req,
        res,
        `User with role ${req.user.role} is not authorize to use this resource`,
        "Invalid token",
        403
      );
    }
    next();
  };
}

module.exports = {
  auth,
  authorize,
};
