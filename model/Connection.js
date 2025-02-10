const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    toUserId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "accepted", "ignored", "rejected"],
        message: `"{VALUE}" is not supported`,
      },
    },
  },
  { timestamps: true }
);
const Connection = mongoose.model("Connection", schema);
module.exports = Connection;
