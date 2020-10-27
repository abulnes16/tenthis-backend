/**
 * Response module
 */



/**
 * Response success function.
 * Allows to respond to the client with
 * standard response.
 * @param {object} req
 * @param {object} res
 * @param {any} message
 * @param {number} status
 */
exports.success = (req, res, message, status) => {
  // If everything goes ok
  res.status(status || 200).send({
    data: message,
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
  
  res.status(status || 500).send({
    message: message,
    errors: body,
  });
};
