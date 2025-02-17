const express = require("express");
const useAuth = require("../middleware/userAuth");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const {
  profileValidation,
  passwordValidation,
} = require("../utils/validation");
const profileRouter = express();

profileRouter.get("/profile/view", useAuth, async (req, res) => {
  try {
    const { email, name, phone } = req.user;
    res.status(200).json({ email, name, phone });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

profileRouter.patch("/profile/edit", useAuth, async (req, res) => {
  const { error, value } = profileValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = req.user;
  const update = await User.findByIdAndUpdate(user._id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!update) {
    return res.status(200).json({ message: "Invalid Credentails" });
  }
  res.status(200).json({ message: "Update successfully" });
});
module.exports = profileRouter;

profileRouter.patch("/profile/edit/password", useAuth, async (req, res) => {
  try {
    const user = req.user;
    const { error, value } = passwordValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const isValid = await user.checkPassword(value.oldPassword);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid credentails" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(value.newPassword, salt);
    const update = await User.findByIdAndUpdate(
      user._id,
      { password: hash },
      { new: true, runValidators: true }
    );
    if (!update) {
      return res.status(400).json({ message: "Invalid credentails" });
    }
    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
