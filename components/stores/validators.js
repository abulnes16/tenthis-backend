const { query } = require("express-validator");

const blockValidator = [
  query("unblock").isBoolean(),
];


module.exports = {
  blockValidator
}