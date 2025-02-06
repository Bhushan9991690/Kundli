const express = require("express");
const useAuth = require("../middleware/userAuth");
const profileRouter = express();
profileRouter.get("/profile/view", useAuth, async (req, res) => {
  try {
    // const {emai = req.user;
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = profileRouter;
