/* Templates model */

// Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const templateSchema = new Schema({
  name: String,
  description: String,
  html: String,
  css: String,
  js: String,
  media: Array,
});

module.exports = new mongoose.model("template", templateSchema);
