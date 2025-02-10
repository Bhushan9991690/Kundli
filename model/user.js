const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const url =
  "data:image/png;base64,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";
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true, trim: true },
    phone: {
      type: Number,
      required: true,
    },
    // photoURL: {
    //   type: String,
    //   default: url,
    // },
  },
  { timestamps: true }
);

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
  console.log(this, "PP");
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
