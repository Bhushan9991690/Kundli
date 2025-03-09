const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, required: true },
  },
  { timestamps: true }
);
const schema = new mongoose.Schema(
  {
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],

    messages: [messageSchema],
  },
  { timestamps: true }
);
const Chat = mongoose.model("Chat", schema);
module.exports = Chat;

// if we use this we restrict our model to only 2 participants
// const schema = new mongoose.Schema(
//     {
//     senderId:{},
//     reciverId:{},
//       message: messageSchema,
//     },
//     { timestamps: true }
//   );
