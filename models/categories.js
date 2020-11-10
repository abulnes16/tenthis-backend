/* Categories model */

// Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
  name: String,
  description: String,
});

module.exports = new mongoose.model('category', categoriesSchema);