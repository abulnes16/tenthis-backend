/* JWT module */

//Response
const ResponseError = require("./errorResponse");

/**
 * Extract token from headers
 * @param {string} auth 
 */
function getToken(auth) {
  if (!auth) {
    throw new ResponseError("Invalid token", 401);
  }

  if (auth.indexOf("Bearer ") === -1) {
    throw new ResponseError("Invalid token format", 400);
  }

  return auth.replace("Bearer ", "");
}


module.exports = {
  getToken
}