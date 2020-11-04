/**
 * Response module
 */

/**
 * Response success function.
 * Allows to respond to the client with
 * standard response.
 * @param {object} req
 * @param {object} res
 * @param {any} data
 * @param {string} message
 * @param {number} status
 */
exports.success = (req, res, data, message = "OK", status) => {
  let statusCode = status || 200;
  // If everything goes ok
  res.status(statusCode).send({
    status: statusCode,
    message,
    data,
  });
};

/**
 * Response error function.
 * Allows to respond to the client with
 * standard error response.
 * @param {object} req
 * @param {object} res
 * @param {any} message
 * @param {number} status
 * @param {any} details
 */
exports.error = (req, res, message, body, status) => {
  //If some error happens
  let statusCode = status || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: message,
    errors: body,
  });
};
