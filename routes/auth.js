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
      return res
        .status(400)
        .json({ message: "Email is already present in DB" });
    }
    const user = new User(req.body);

    const userData = await user.save();
    const token = await userData.getJwt();
    res.cookie("Token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
    res.json({ message: "Sign up successfully", data: userData });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
// authRouter.post("/auth/login", async (req, res) => {
//   try {
//     const { error, value } = loginValidationSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }
//     const { email, password } = req.body;
//     const userData = await User.findOne({ email });
//     if (!userData) {
//       return res.status(400).json({ message: "Invalid credentails" });
//     }
//     const matchPassword = await userData.checkPassword(password);

//     if (!matchPassword) {
//       return res.status(400).json({ message: "Invalid credentails.." });
//     }
//     const token = await userData.getJwt();
//     res.cookie("Token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
//     res.status(200).json({ message: "login successfully", userData });
//   } catch (error) {
//     res.status(401).json({ message: error, Error: "Pata nii" });
//   }
// });
authRouter.post("/auth/login", async (req, res) => {
  try {
    console.log("🔵 Login API Hit!");

    const { error } = loginValidationSchema.validate(req.body);
    if (error) {
      console.log("🟠 Validation Error:", error.details[0].message);
      return res.status(400).json({ message: error.details[0].message });
    }

    console.log("✅ Validation Passed!");

    const { email, password } = req.body;
    console.log("🔵 Searching User in DB...");

    const userData = await User.findOne({ email });

    if (!userData) {
      console.log("🟠 User Not Found in Database!");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ User Found:", userData);

    console.log("🔵 Checking Password...");
    const matchPassword = await userData.checkPassword(password);

    if (!matchPassword) {
      console.log("🟠 Incorrect Password!");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log("✅ Password Matched!");

    console.log("🔵 Generating Token...");
    const token = await userData.getJwt();

    console.log("✅ Token Generated:", token);

    console.log("🔵 Setting Cookie...");
    res.cookie("Token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });

    console.log("✅ Cookie Set!");

    console.log("🟢 Sending Response: Login Successful!");
    res.status(200).json({ message: "Login successful", userData });
  } catch (error) {
    console.log("🔴 ERROR:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

authRouter.post("/auth/logout", (req, res) => {
  try {
    res.clearCookie("Token");
    res.json({ message: "LogOut Successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = authRouter;
