const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/database");
const cors = require("cors");
const app = express();
// const PORT = process.env.port;

const PORT = 3000;

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use(
  cors({
    origin: "http://13.50.16.158",
    optionsSuccessStatus: 200,
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
    app.listen(PORT, () => {
      console.log("Listening server 3000");
    });
  })
  .catch((err) => {
    console.log("NOt DB Connetion", err);
  });
