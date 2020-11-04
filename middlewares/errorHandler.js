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
  error.message = err.message;

  console.log(`${err}`.red);

  return response.error(req, res, error.message, error.body, error.code);
};

module.exports = errorHandler;
