/* User model */

// Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  store: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  plan: { type: mongoose.SchemaTypes.ObjectId, required: true },
  role: {type: String, required: true},
});

module.exports = new mongoose.model("user", userSchema);
