const express = require("express");
const useAuth = require("../middleware/userAuth");
const profileRouter = express();
profileRouter.get("/profile/view", useAuth, async (req, res) => {
  try {
    const { email, name, phone } = req.user;
    res.status(200).json({ email, name, phone });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
module.exports = profileRouter;
