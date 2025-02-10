const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("../model/user");
const Connection = require("../model/Connection");
const useAuth = require("../middleware/userAuth");
const requestRouter = express.Router();

// Request-->Send 1)Interested 2) Ignored
requestRouter.post(
  "/request/send/:userId/:status",
  useAuth,
  async (req, res) => {
    try {
      const { userId, status } = req.params;
      const fromUserId = req.user._id;
      const toUserId = userId;
      console.log(req.user._id);
      console.log(userId);

      if (fromUserId.equals(toUserId)) {
        return res
          .status(400)
          .json({ message: "Cannot send a reqest to Iteself" });
      }
      const isValidId = mongoose.Types.ObjectId.isValid(toUserId);
      if (!isValidId) {
        return res.status(400).json({ message: "Not a valid Id" });
      }
      const validStatus = ["interested", "ignored"];
      if (!validStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid Status Type " + status });
      }
      const isUserIdInDB = await User.findOne({ _id: toUserId });
      if (!isUserIdInDB) {
        return res.status(400).json({ message: "User not found" });
      }
      const existingRequest = await Connection.findOne({
        $or: [
          { fromUserId: fromUserId, toUserId: toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      console.log(existingRequest);

      if (existingRequest) {
        return res.status(400).json({ message: "Alreday send a request" });
      }
      const request = new Connection({
        fromUserId,
        toUserId,
        status,
      });
      const f = await request.save();
      console.log(f);

      res.status(200).json({ message: "Request send successfully" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
);
requestRouter.post(
  "/request/review/:requestId/:status",
  useAuth,
  async (req, res) => {
    try {
      const { requestId, status } = req.params;
      const validStatus = ["accepted", "rejected"];
      if (!validStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status type" });
      }
      if (!mongoose.Types.ObjectId.isValid(requestId)) {
        return res.status(400).json({ message: "Invalid ObjectId" });
      }

      const findRequest = await Connection.findOne({
        _id: requestId,
        toUserId: req.user._id,
        status: "interested",
      });

      if (!findRequest) {
        return res.status(400).json({ message: "NO request found" });
      }
      findRequest.status = status;
      const data = await findRequest.save();
      
      console.log("g", data);

      res.status(400).json({ message: "connection request", status, data });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
);

module.exports = requestRouter;
