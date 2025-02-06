const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/database");
const app = express();
const PORT = process.env.port;
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");

app.use(cookieParser());
app.use(express.json());
app.use("/", authRouter);
app.use("/", profileRouter);

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
