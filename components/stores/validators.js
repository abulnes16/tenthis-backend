const { query } = require("express-validator");

const blockValidator = [
  query("unblock").optional().isBoolean(),
];


module.exports = {
  blockValidator
}