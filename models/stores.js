/* Store model */

// Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: "User" },
  description: String,
  products: Array,
  categories: Array,
  pages: Array,
  configuration: mongoose.SchemaTypes.Mixed,
  media: Array,
});

module.exports = new mongoose.model("store", storeSchema);
