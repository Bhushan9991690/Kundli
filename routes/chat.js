const express = require("express");
const Chat = require("../model/Chat");
const userAuth = require("../middleware/userAuth");
const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const userId = req.user._id;
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName",
    });
    if (!chat) {
      chat = new Chat({
        participants: { $all: { userId, targetUserId } },
        messages: [],
      });
      await chat.save();
    }
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
  }
});
module.exports = chatRouter;
