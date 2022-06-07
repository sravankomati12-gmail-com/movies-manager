const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phoneno: String,
  dob: { type: Date, default: Date.now },
  gender: String,
  isadmin: { type: Boolean, default: false },
  isdelated: { type: Boolean, default: false },
  createdat: { type: Date, default: Date.now },
});

module.exports = mongoose.model("userinfo", userSchema);
