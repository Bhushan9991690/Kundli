const jwt = require("jsonwebtoken");
const User = require("../model/user");
const useAuth = async (req, res, next) => {
  try {
    const Token = req.cookies.Token;
    if (!Token) {
      return res.status(400).json({ message: "InValid token" });
    }
    const verifyToken = await jwt.verify(Token, process.env.key);
    if (!verifyToken) {
      return res.status(400).json({ message: "Invalid credentails" });
    }
    const user = await User.findOne({ _id: verifyToken._id });
    if (!user) {
      return res.status(400).json({ message: "Invalid User" });
    }
    // const plainUser = user.toObject();
    // delete plainUser.password;

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
module.exports = useAuth;
