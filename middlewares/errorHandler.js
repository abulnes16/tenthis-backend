/* Error handler middleware */

//Response
const response = require("../modules/response");
require("colors");

/**
 * Error handler middleware
 *
 * @param {error} err
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  let message = "";
  error.message = err.message;

  //If error code was not provided that means it's a 500 error
  if (!error.code) {
    console.log(`${err}`.red);
    message = "Internal server error";
  } else {
    message = err.message;
  }


  return response.error(req, res, message, error.body, error.code);
};

module.exports = errorHandler;
