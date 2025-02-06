const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const schema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 4, maxlength: 20 },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  phone: {
    type: Number,
    required: true,
  },
});

schema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let user = this;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
schema.methods.checkPassword = async function (passwordByUser) {
  let user = this;
  const check = await bcrypt.compare(passwordByUser, user.password);
  return check;
};
schema.methods.getJwt = async function () {
  try {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, process.env.key, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    throw new Error(error);
  }
};
const User = mongoose.model("User", schema);
module.exports = User;
