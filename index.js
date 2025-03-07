require("dotenv").config();
const express = require("express");
const initalizeSocket = require("./utils/socket");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const cors = require("cors");
// require http module
const http = require("http");
const app = express();

// Create a server using http to get more features( like real time chat)
// That handle request before express ,
// Because by default express is also create http server internally
const server = http.createServer(app);
initalizeSocket(server);

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const PORT = process.env.port;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Conneted successfully to DB");
    // To get more control f(like chat features)
    // we use "server.listen" instead of "app.listen"
    server.listen(PORT, () => {
      console.log("Listening server 3000");
    });
  })
  .catch((err) => {
    console.log("NOt DB Connetion", err);
  });
