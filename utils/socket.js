const socket = require("socket.io");

const initalizeSocket = (server) => {
  // By default, browsers block WebSocket connections from different domains
  const io = new socket.Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
  });
  //   Detect when a user connect
  io.on("connection", (socket) => {
    // console.log("A new user connected with socketId : ", socket.id);

    socket.on("joinChat", ({ userId, targetUserId, firstName }) => {
      const roomId = [userId, targetUserId].sort().join("_");
      console.log(firstName, " : ", roomId);
      socket.join(roomId);
    });
    socket.on("sendMessage", ({ userId, targetUserId, message, firstName }) => {
      const roomId = [userId, targetUserId].sort().join("_");
      io.to(roomId).emit("messageRecieved", { firstName, message });
      console.log(firstName, message);
    });

    // Detect when a user leaves & Free up resources
    // ( Helps manage active users and clean up memory )
    // disconnect is a pre-built event in Socket.io.
    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  });
};

module.exports = initalizeSocket;
