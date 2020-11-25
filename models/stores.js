/* Store model */

// Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: "user" },
  description: String,
  pages: Array,
  configuration: mongoose.SchemaTypes.Mixed,
  isBlock: Boolean,
  isActive: Boolean,
});

module.exports = new mongoose.model("store", storeSchema);
