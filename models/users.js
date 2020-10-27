/* User model */

// Mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  store: {
    type: Schema.ObjectId,
    ref: 'Store',
  },
  plan: { type: Schema.ObjectId, ref: 'Plan' },
  role: {type: String, required: true},
});

module.exports = new mongoose.model("user", userSchema);
