const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema);
