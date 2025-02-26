const express = require("express");
const useAuth = require("../middleware/userAuth");
const Connection = require("../model/Connection");
const { default: mongoose } = require("mongoose");
const User = require("../model/user");
const userRouter = express.Router();

userRouter.get("/user/request/recieved", useAuth, async (req, res) => {
  try {
    const user = req.user;

    const requestRecieve = await Connection.find({
      status: "interested",
      toUserId: user._id,
    }).populate("fromUserId", "firstName lastName photoURL");

    if (requestRecieve.length === 0) {
      return res.status(400).json({ message: "No request Found" });
    }
    res.json({ message: requestRecieve });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

userRouter.get("/user/connections", useAuth, async (req, res) => {
  try {
    const user = req.user;
    const connections = await Connection.find({
      status: "accepted",
      $or: [{ fromUserId: user._id }, { toUserId: user._id }],
    })
      .populate("fromUserId", "firstName lastName age gender ")
      .populate("toUserId", "firstName lastName age gender ");
    if (connections.length === 0) {
      return res.status(200).json({ message: "No Connections Found" });
    }
    const data = connections.map((c, i) => {
      if (c.fromUserId._id.equals(user._id)) {
        return c.toUserId;
      } else {
        return c.fromUserId;
      }
    });
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

userRouter.get("/feed", useAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const skips = (page - 1) * limit;

    // Restrict to only atleast 50 User one time only

    limit = limit > 50 ? 50 : limit;

    const loggInUser = req.user._id;

    const UserConnect = await Connection.find({
      $or: [
        { fromUserId: loggInUser },
        {
          toUserId: loggInUser,
        },
      ],
    }).select("toUserId fromUserId");
    const hide = new Set();
    UserConnect.forEach((req) => {
      hide.add(req.fromUserId.toString());
      hide.add(req.toUserId.toString());
    });

    const feedProvide = await User.find({
      $and: [{ _id: { $ne: loggInUser } }, { _id: { $nin: Array.from(hide) } }],
    })
      .select("firstName lastName photoURL email phone about gender")
      .skip(skips)
      .limit(limit);

    if (feedProvide.length == 0) {
      return res.status(200).json("No user found");
    }
    res.status(200).json({ message: feedProvide });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = userRouter;
