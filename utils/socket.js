const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../model/Chat");
const Connection = require("../model/Connection");

const hash = ({ userId, targetUserId }) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initalizeSocket = (server) => {
  const io = new socket.Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
  });
  io.on("connection", (socket) => {
    console.log("New user login");

    socket.on("joinChat", ({ userId, targetUserId, firstName }) => {
      const roomId = hash(userId, targetUserId);
      console.log(firstName, " : ", roomId);
      socket.join(roomId);
    });
    socket.on(
      "sendMessage",
      async ({ userId, targetUserId, message, firstName }) => {
        try {
          // const validIdentity = await Connection.findOne({
          //   $or: [
          //     { fromUserId: userId, toUserId: targetUserId },
          //     { fromUserId: targetUserId, toUserId: userId },
          //   ],
          //   status: "accepted",
          // });
          // if (!validIdentity) {
          //   return;
          // }

          const roomId = hash(userId, targetUserId);
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({ senderId: userId, message });
          await chat.save();
          io.to(roomId).emit("messageRecieved", { firstName, message });
        } catch (error) {
          console.error(error);
        }
      }
    );

    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });
};

module.exports = initalizeSocket;
