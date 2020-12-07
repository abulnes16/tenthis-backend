const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pageSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  store: { type: Schema.ObjectId, ref: "store" },
  isMain: Boolean,
  isVisible: Boolean,
  html: mongoose.SchemaTypes.Mixed,
  css: String,
});

module.exports = new mongoose.model("page", pageSchema);
