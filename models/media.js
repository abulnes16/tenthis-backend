/* Media model */

// Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
  name: String,
  path: String,
  date: Date,
});

module.exports = new mongoose.model("media", mediaSchema);
