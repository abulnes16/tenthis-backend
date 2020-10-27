/* Store model */

// Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  name: {type: String, required: true},
  description: String,
  products: Array,
  categories: Array,
  pages: Array,
  configuration: mongoose.SchemaTypes.Mixed,
  media: Array,
  logo: String,
  favicon: String,
  keywords: Array,
  css: String,
  js: String,
  header: String,
  footer: String
});

module.exports = new mongoose.model('store', storeSchema);