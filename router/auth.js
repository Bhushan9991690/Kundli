const express = require("express");
const User = require("../model/user");
const {
  signupValidationSchema,
  loginValidationSchema,
} = require("../utils/validation");
const authRouter = express.Router();
authRouter.post("/auth/signup", async (req, res) => {
  try {
    const { error, value } = signupValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const isDuplicateEmail = await User.findOne({ email: req.body.email });
    if (isDuplicateEmail) {
      return res.status(200).send("Email is already present in DB");
    }
    const user = new User(req.body);
    await user.save();
    res.send("Sign up successfully");
  } catch (error) {
    res.status(400).send(error.messages);
  }
});
authRouter.post("/auth/login", async (req, res) => {
  try {
    const { error, value } = loginValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const { email, password } = req.body;
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).send("Invalid credentails");
    }
    const matchPassword = await userData.checkPassword(password);

    if (!matchPassword) {
      return res.status(400).send("Invalid credentails..");
    }
    const token = await userData.getJwt();
    res.cookie("Token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(200).send("login successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});
authRouter.post("/auth/logout", (req, res) => {
  try {
    res.clearCookie("Token");
    res.send("LogOut Successfully");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = authRouter;
