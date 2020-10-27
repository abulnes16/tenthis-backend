//Error handler

//Response
const response = require("../modules/response");
require("colors");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (error.code >= 500) {
    console.log(`${err}`.red);
  }

  return response.error(req, res, error.message, error.body, error.code);
};

module.exports = errorHandler;
