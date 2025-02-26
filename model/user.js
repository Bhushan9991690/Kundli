const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const url = "http://picsum.photos/200/300.jpg";
const schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: false, trim: true },
    password: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
      default: url,
    },
    skills: { type: [String], },
    about: {
      type: String,
      default: "This is a User profile",
    },
    gender: {
      type: String,
      enum: {
        values: ["M", "F", "O"],
        message: "{VALUE} is not Gender Type",
      },
    },
    age: {
      type: Number,
      min: 18,
    },
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
